// --- Supabase Setup ---
const SUPABASE_URL = "https://rlgkuiadmjfyylibigwn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZ2t1aWFkbWpmeXlsaWJpZ3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MTQyNDgsImV4cCI6MjA3NDQ5MDI0OH0.odfeURUQ03oTPyYk8fS9LQDJq4Ysfr68R9P-j0YsAvM";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- DOM Elements ---
const stars = document.querySelectorAll("#starRating span");
const ratingInput = document.getElementById("rating");
const reviewsList = document.getElementById("reviewsList");
const statusEl = document.getElementById("status");
const reviewForm = document.getElementById("reviewForm");

// --- Star Rating Selection ---
function setupStarRating() {
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = Number(star.dataset.value);
      ratingInput.value = rating;

      stars.forEach((s, i) => {
        s.classList.toggle("text-yellow-400", i < rating);
        s.classList.toggle("text-gray-300", i >= rating);
      });
    });
  });
}

// --- Render Reviews ---
function renderReviews(reviews = []) {
  if (!reviews.length) {
    reviewsList.innerHTML = `<p class="text-gray-500 italic">No reviews yet.</p>`;
    return;
  }

  reviewsList.innerHTML = reviews
    .map(
      (r) => `
      <div class="bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-xl shadow-md p-6">
        <p class="font-semibold text-slate-800 mb-1">${r.name}</p>
        <p class="text-sm text-gray-500 mb-3">
          ${r.created_at ? new Date(r.created_at).toLocaleDateString() : ""}
        </p>
        <div class="flex items-center mb-6">
          <div class="flex text-yellow-500 text-2xl">
            ${"★".repeat(r.rating || 0)}${"☆".repeat(5 - (r.rating || 0))}
          </div>
        </div>
        <p class="text-gray-700 italic">"${r.text}"</p>
      </div>
    `
    )
    .join("");
}

// --- Load Reviews from Supabase ---
async function loadReviews() {
  try {
    const { data, error } = await supabaseClient
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) throw error;
    renderReviews(data);
  } catch (err) {
    console.error("Error loading reviews:", err.message);
    reviewsList.innerHTML = `<p class="text-red-600">Could not load reviews. Please try again later.</p>`;
  }
}

// --- Submit Review ---
async function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("text").value.trim();
  const rating = Number(ratingInput.value);

  if (!name || !text || !rating) {
    showStatus("Please fill in all fields.", "red");
    return;
  }

  try {
    const { error } = await supabaseClient
      .from("reviews")
      .insert([{ name, text, rating }]);

    if (error) throw error;

    showStatus("Thank you for your review!", "green");
    reviewForm.reset();
    resetStars();
    loadReviews();
  } catch (err) {
    console.error("Error submitting review:", err.message);
    showStatus("Error submitting review.", "red");
  }
}

// --- Helpers ---
function showStatus(message, color = "gray") {
  statusEl.textContent = message;
  statusEl.className = `text-center text-sm text-${color}-600 mt-2`;
}

function resetStars() {
  ratingInput.value = "";
  stars.forEach((s) => {
    s.classList.remove("text-yellow-400");
    s.classList.add("text-gray-300");
  });
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  setupStarRating();
  reviewForm.addEventListener("submit", handleSubmit);
  loadReviews();
});