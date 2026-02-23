// --- Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyBTli0EY0Y4yvDsUSRPRsaCAPsAxtiGhfM",
  authDomain: "levande-vikings-bastu-2908c.firebaseapp.com",
  projectId: "levande-vikings-bastu-2908c",
  storageBucket: "levande-vikings-bastu-2908c.firebasestorage.app",
  messagingSenderId: "924601170755",
  appId: "1:924601170755:web:f35ff5c0660f7239084df6"
};

// --- Init Firebase ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- DOM Elements ---
const stars = document.querySelectorAll("#starRating span");
const ratingInput = document.getElementById("rating");
const reviewsList = document.getElementById("reviewsList");
const statusEl = document.getElementById("status");
const reviewForm = document.getElementById("reviewForm");

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

// --- Ensure Auth ---
async function ensureAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}

// --- Star Rating Selection ---
function setupStarRating() {
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const rating = Number(star.dataset.value);
      ratingInput.value = rating;

      stars.forEach((s) => {
        const starValue = Number(s.dataset.value);
        s.classList.toggle("text-yellow-400", starValue <= rating);
        s.classList.toggle("text-gray-300", starValue > rating);
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
    .map((r) => {
      let dateStr = "";
      if (r.created_at) {
        if (typeof r.created_at.toDate === "function") {
          dateStr = r.created_at.toDate().toLocaleDateString();
        } else if (r.created_at instanceof Date) {
          dateStr = r.created_at.toLocaleDateString();
        }
      }

      return `
        <div class="bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-lg shadow-md p-6">
          <p class="text-slate-800 mb-1">${r.name}</p>
          <p class="text-sm text-gray-500 mb-3">${dateStr}</p>
          <div class="flex items-center mb-6">
            <div class="flex text-yellow-500 text-2xl">
              ${"★".repeat(r.rating || 0)}${"☆".repeat(5 - (r.rating || 0))}
            </div>
          </div>
          <p class="text-gray-700 italic">"${r.text}"</p>
        </div>
      `;
    })
    .join("");
}

// --- Load Reviews from Firestore ---
async function loadReviews() {
  try {
    const q = query(
      collection(db, "reviews"),
      orderBy("created_at", "desc"),
      limit(6)
    );
    const snapshot = await getDocs(q);

    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    renderReviews(reviews);
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
    await ensureAuth(); // Ensure user is authenticated

    await addDoc(collection(db, "reviews"), {
      name,
      text,
      rating,
      created_at: serverTimestamp(), // Use server timestamp
    });

    showStatus("", "green");
    reviewForm.reset();
    resetStars();
    loadReviews();
  } catch (err) {
    console.error("Error submitting review:", err.message);
    showStatus("Error submitting review.", "red");
  }
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  setupStarRating();
  reviewForm.addEventListener("submit", handleSubmit);
  loadReviews();
});