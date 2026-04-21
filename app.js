const STORAGE_KEY = "souklyState";
const SUPABASE_URL = "https://rfmculpnfzbjywrxjttn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmbWN1bHBuZnpianl3cnhqdHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNjAzNDAsImV4cCI6MjA5MTkzNjM0MH0.uZR8jM7z7QxmtVw3lsnnuKW3JNnsz922cZURnk7htP8";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const placeholderImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 720">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#f6dfcb"/>
          <stop offset="1" stop-color="#ead8c8"/>
        </linearGradient>
      </defs>
      <rect width="600" height="720" rx="40" fill="url(#g)"/>
      <circle cx="300" cy="260" r="90" fill="#ffffff" fill-opacity="0.8"/>
      <rect x="160" y="390" width="280" height="28" rx="14" fill="#ffffff" fill-opacity="0.8"/>
      <rect x="210" y="442" width="180" height="24" rx="12" fill="#ffffff" fill-opacity="0.65"/>
    </svg>
  `);

const makeDemoProduct = (overrides) => ({
  id: crypto.randomUUID(),
  sellerName: "Soukly Demo",
  sellerProfileId: null,
  image: placeholderImage,
  hashtags: [],
  brands: [],
  comments: [],
  offers: [],
  messages: [],
  rawConversations: [],
  ratings: [],
  ratingCount: 0,
  averageRating: null,
  isDemo: true,
  ...overrides,
});

const defaultProducts = [
  makeDemoProduct({ title: "Zara Floral Midi Dress",           category: "Woman",      price: 165, condition: "Like new",      delivery: "Courier",                   location: "Dubai Marina",  description: "Stunning midi dress in soft floral print, size S. Worn once to a garden brunch. Dry-cleaned and ready to ship.",      brands: ["Zara"],        hashtags: ["#zara","#dress","#summerstyle"] }),
  makeDemoProduct({ title: "Mango Linen Blazer – Camel",       category: "Woman",      price: 220, condition: "New with tags", delivery: "Courier",                   location: "JLT",           description: "Brand new, original tags still attached. Size M. Never worn – bought during sale but does not fit.",                   brands: ["Mango"],       hashtags: ["#mango","#blazer","#newtags"] }),
  makeDemoProduct({ title: "Nike Air Max 270 – White/Gold",    category: "Shoes&Bags", price: 280, condition: "Like new",      delivery: "Courier or hand delivery",  location: "JBR",           description: "Size UK 7 / EU 40.5. Worn only 2-3 times indoors. No visible wear on sole. Original box included.",                   brands: ["Nike"],        hashtags: ["#nike","#airmax","#sneakers"] }),
  makeDemoProduct({ title: "Dyson Airwrap Complete Styler",    category: "Beauty",     price: 950, condition: "Like new",      delivery: "Courier",                   location: "Downtown Dubai",description: "All original attachments, storage case, and box included. Lightly used – selling because I upgraded to the newer model.", brands: ["Dyson"],       hashtags: ["#dyson","#airwrap","#hairtools"] }),
  makeDemoProduct({ title: "Coach Tabby Shoulder Bag – Tan",   category: "Shoes&Bags", price: 620, condition: "Like new",      delivery: "Courier",                   location: "DIFC",          description: "Authentic Coach Tabby 26 in tan pebbled leather. Minimal signs of use. Comes with original dust bag.",                  brands: ["Coach"],       hashtags: ["#coach","#bag","#luxury"] }),
  makeDemoProduct({ title: "Sunday Riley Good Genes Serum",    category: "Beauty",     price: 95,  condition: "Sealed",        delivery: "Courier",                   location: "Jumeirah",      description: "Sealed and unopened. Expiry 2026. Received as a gift but already have one. Stored away from heat.",                     brands: ["Sunday Riley"],hashtags: ["#sundayriley","#serum","#sealed"] }),
  makeDemoProduct({ title: "Lululemon Align Leggings – Black", category: "Sports",     price: 175, condition: "Like new",      delivery: "Courier",                   location: "Dubai Marina",  description: "Size 6. Washed once, no pilling, no fading. Buttery-soft feel still perfect. Great for yoga or pilates.",              brands: ["Lululemon"],   hashtags: ["#lululemon","#yoga","#activewear"] }),
  makeDemoProduct({ title: "Swarovski Crystal Stud Earrings",  category: "Accessories",price: 130, condition: "Like new",      delivery: "Courier",                   location: "Palm Jumeirah", description: "Classic round crystal studs in silver setting. Barely worn – only twice. Original gift box and pouch included.",         brands: ["Swarovski"],   hashtags: ["#swarovski","#earrings","#jewellery"] }),
  makeDemoProduct({ title: "H&M Premium Quilted Jacket – Navy",category: "Man",        price: 110, condition: "Good",          delivery: "Courier or hand delivery",  location: "Al Barsha",     description: "Size L. Good condition, freshly washed. No stains or damage. Great for cooler UAE evenings or travel.",                 brands: ["H&M"],         hashtags: ["#hm","#jacket","#menswear"] }),
  makeDemoProduct({ title: "IKEA KALLAX 4×4 Shelf – White",   category: "Home",       price: 180, condition: "Good",          delivery: "Hand delivery",             location: "Business Bay",  description: "4×4 KALLAX unit in white. Slight scuff on one side, otherwise solid. Moving out – buyer must arrange transport.",       brands: ["IKEA"],        hashtags: ["#ikea","#homedecor","#kallax"] }),
];

const state = loadState();

const elements = {
  loginForm: document.getElementById("loginForm"),
  signInModeButton: document.getElementById("signInModeButton"),
  signUpModeButton: document.getElementById("signUpModeButton"),
  authCardTitle: document.getElementById("authCardTitle"),
  authSubmitButton: document.getElementById("authSubmitButton"),
  authHelperText: document.getElementById("authHelperText"),
  forgotPasswordButton: document.getElementById("forgotPasswordButton"),
  passwordRecoveryForm: document.getElementById("passwordRecoveryForm"),
  passwordRecoverySubmitButton: document.getElementById("passwordRecoverySubmitButton"),
  passwordRecoveryFeedback: document.getElementById("passwordRecoveryFeedback"),
  productForm: document.getElementById("productForm"),
  productFormTitle: document.getElementById("productFormTitle"),
  productImageInput: document.getElementById("productImageInput"),
  imagePreviewGrid: document.getElementById("imagePreviewGrid"),
  imageFileName: document.getElementById("imageFileName"),
  productSubmitButton: document.getElementById("productSubmitButton"),
  productFeedback: document.getElementById("productFeedback"),
  homeListings: document.getElementById("homeListings"),
  favoriteListings: document.getElementById("favoriteListings"),
  brandFilterInput: document.getElementById("brandFilterInput"),
  minPriceFilterInput: document.getElementById("minPriceFilterInput"),
  maxPriceFilterInput: document.getElementById("maxPriceFilterInput"),
  clearAllFilters: document.getElementById("clearAllFilters"),
  brandFilterChips: document.getElementById("brandFilterChips"),
  categoryFilterChips: document.getElementById("categoryFilterChips"),
  locationFilterChips: document.getElementById("locationFilterChips"),
  conditionFilterChips: document.getElementById("conditionFilterChips"),
  deliveryFilterChips: document.getElementById("deliveryFilterChips"),
  activeFilters: document.getElementById("activeFilters"),
  activeFilterRow: document.getElementById("activeFilterRow"),
  profileListings: document.getElementById("profileListings"),
  profileName: document.getElementById("profileName"),
  profileHandle: document.getElementById("profileHandle"),
  profileBio: document.getElementById("profileBio"),
  profileAvatar: document.getElementById("profileAvatar"),
  profilePhotoInput: document.getElementById("profilePhotoInput"),
  profilePhotoUpload: document.getElementById("profilePhotoUpload"),
  profileFeedback: document.getElementById("profileFeedback"),
  statListings: document.getElementById("statListings"),
  statRating: document.getElementById("statRating"),
  statDelivery: document.getElementById("statDelivery"),
  authStatus: document.getElementById("authStatus"),
  authHint: document.getElementById("authHint"),
  authFeedback: document.getElementById("authFeedback"),
  favoritesCount: document.getElementById("favoritesCount"),
  notificationsCount: document.getElementById("notificationsCount"),
  signOutButton: document.getElementById("signOutButton"),
  navLinks: document.querySelectorAll("[data-view-target]"),
  viewPanels: document.querySelectorAll(".view-panel"),
  backToHomeButton: document.getElementById("backToHomeButton"),
  detailImage: document.getElementById("detailImage"),
  detailTags: document.getElementById("detailTags"),
  detailTitle: document.getElementById("detailTitle"),
  detailPrice: document.getElementById("detailPrice"),
  detailDescription: document.getElementById("detailDescription"),
  detailSeller: document.getElementById("detailSeller"),
  detailLocation: document.getElementById("detailLocation"),
  detailCondition: document.getElementById("detailCondition"),
  detailDelivery: document.getElementById("detailDelivery"),
  detailFavoriteButton: document.getElementById("detailFavoriteButton"),
  toggleOfferButton: document.getElementById("toggleOfferButton"),
  openMessageButton: document.getElementById("openMessageButton"),
  editProductButton: document.getElementById("editProductButton"),
  deleteProductButton: document.getElementById("deleteProductButton"),
  offerPanel: document.getElementById("offerPanel"),
  offerForm: document.getElementById("offerForm"),
  offerHistory: document.getElementById("offerHistory"),
  commentForm: document.getElementById("commentForm"),
  commentList: document.getElementById("commentList"),
  detailFeedback: document.getElementById("detailFeedback"),
  ratingPanel: document.getElementById("ratingPanel"),
  ratingSummary: document.getElementById("ratingSummary"),
  ratingFormWrap: document.getElementById("ratingFormWrap"),
  ratingForm: document.getElementById("ratingForm"),
  starInput: document.getElementById("starInput"),
  ratingValueInput: document.getElementById("ratingValueInput"),
  ratingFeedback: document.getElementById("ratingFeedback"),
  ratingSubmitButton: document.getElementById("ratingSubmitButton"),
  notificationsList: document.getElementById("notificationsList"),
  conversationList: document.getElementById("conversationList"),
  chatThreadHeader: document.getElementById("chatThreadHeader"),
  chatThread: document.getElementById("chatThread"),
  chatForm: document.getElementById("chatForm"),
};

bindEvents();
initializeApp();
showSplash();
initInstallPrompts();

function showSplash() {
  const splash = document.getElementById("splashScreen");
  if (!splash) return;
  setTimeout(() => {
    splash.classList.add("hidden");
    setTimeout(() => splash.remove(), 500);
  }, 1500);
}

// ── PWA Install Prompts ────────────────────────────────────────
let androidDeferredPrompt = null;

function initInstallPrompts() {
  const isStandalone =
    window.navigator.standalone === true ||
    window.matchMedia("(display-mode: standalone)").matches;

  // Already installed — don't show anything
  if (isStandalone) return;

  // ── Android: capture the beforeinstallprompt event ──
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    androidDeferredPrompt = e;
    // Show after a short delay so the page loads first
    setTimeout(showAndroidInstallButton, 3000);
  });

  // ── iOS Safari: show manual install guide ──
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isSafari =
    /safari/i.test(navigator.userAgent) &&
    !/crios|fxios|opios|chrome/i.test(navigator.userAgent);
  const dismissed = localStorage.getItem("soukly_ios_install_dismissed");

  if (isIOS && isSafari && !dismissed) {
    // Show after splash finishes
    setTimeout(showIOSInstallBanner, 3000);
  }
}

function showIOSInstallBanner() {
  if (document.getElementById("iosInstallBanner")) return;

  const banner = document.createElement("div");
  banner.id = "iosInstallBanner";
  banner.innerHTML = `
    <div class="ios-banner-row">
      <div class="ios-banner-icon">
        <img src="assets/soukly_icon.svg" alt="Soukly" />
      </div>
      <div class="ios-banner-text">
        <strong>Install Soukly</strong>
        <p>Add to your home screen for the full app experience</p>
      </div>
      <button class="ios-banner-close" id="iosInstallClose">✕</button>
    </div>
    <div class="ios-banner-steps">
      <div class="ios-step">
        <span class="ios-step-num">1</span>
        <span>Tap</span>
        <span style="font-size:17px;">⬆</span>
        <span>Share</span>
      </div>
      <span class="ios-step-arrow">›</span>
      <div class="ios-step">
        <span class="ios-step-num">2</span>
        <span>"Add to Home Screen"</span>
      </div>
      <span class="ios-step-arrow">›</span>
      <div class="ios-step">
        <span class="ios-step-num">3</span>
        <span>Add</span>
      </div>
    </div>
    <div class="ios-banner-pointer">↓</div>
  `;

  document.body.appendChild(banner);

  document.getElementById("iosInstallClose")?.addEventListener("click", () => {
    banner.remove();
    localStorage.setItem("soukly_ios_install_dismissed", "1");
  });

  // Auto-hide after 20 seconds
  setTimeout(() => banner.remove(), 20000);
}

function showAndroidInstallButton() {
  if (document.getElementById("androidInstallBtn")) return;
  if (!androidDeferredPrompt) return;

  const btn = document.createElement("button");
  btn.id = "androidInstallBtn";
  btn.innerHTML = `⬇ Install Soukly`;

  document.body.appendChild(btn);

  btn.addEventListener("click", async () => {
    if (!androidDeferredPrompt) return;
    androidDeferredPrompt.prompt();
    const { outcome } = await androidDeferredPrompt.userChoice;
    androidDeferredPrompt = null;
    btn.remove();
  });

  // Auto-hide after 15 seconds
  setTimeout(() => btn.remove(), 15000);
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);
    return {
      currentUser: parsed.currentUser || null,
      products: [],
      filters: {
        query: parsed.filters?.query || "",
        category: parsed.filters?.category || "",
        location: parsed.filters?.location || "",
        condition: parsed.filters?.condition || "",
        delivery: parsed.filters?.delivery || "",
        minPrice: parsed.filters?.minPrice || "",
        maxPrice: parsed.filters?.maxPrice || "",
      },
      selectedProductId: parsed.selectedProductId || null,
      draftImages: [],
      favoriteIds: parsed.favoriteIds || [],
      notifications: parsed.notifications || [],
      commentLikeIds: parsed.commentLikeIds || [],
      myRatings: parsed.myRatings || {},
      isOfferOpen: parsed.isOfferOpen || false,
      activeConversationKey: parsed.activeConversationKey || null,
      authMode: parsed.authMode || "signIn",
      editingProductId: parsed.editingProductId || null,
      isPasswordRecovery: false,
    };
  }

  return {
    currentUser: null,
    products: [],
    filters: {
      query: "",
      category: "",
      location: "",
      condition: "",
      delivery: "",
      minPrice: "",
      maxPrice: "",
    },
    selectedProductId: null,
    draftImages: [],
    favoriteIds: [],
    notifications: [],
    commentLikeIds: [],
    myRatings: {},
    isOfferOpen: false,
    activeConversationKey: null,
    authMode: "signIn",
    editingProductId: null,
    isPasswordRecovery: false,
  };
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentUser: state.currentUser,
      filters: state.filters,
      selectedProductId: state.selectedProductId,
      favoriteIds: state.favoriteIds,
      notifications: state.notifications,
      commentLikeIds: state.commentLikeIds,
      myRatings: state.myRatings,
      isOfferOpen: state.isOfferOpen,
      activeConversationKey: state.activeConversationKey,
      authMode: state.authMode,
      editingProductId: state.editingProductId,
    })
  );
}

function bindEvents() {
  elements.loginForm.addEventListener("submit", handleLogin);
  elements.signInModeButton.addEventListener("click", () => setAuthMode("signIn"));
  elements.signUpModeButton.addEventListener("click", () => setAuthMode("signUp"));
  elements.forgotPasswordButton.addEventListener("click", handleForgotPassword);
  elements.passwordRecoveryForm.addEventListener("submit", handlePasswordRecoverySubmit);
  elements.productForm.addEventListener("submit", handleProductSubmit);
  elements.productImageInput.addEventListener("change", handleImageChange);
  elements.profilePhotoInput.addEventListener("change", handleProfilePhotoChange);
  elements.signOutButton.addEventListener("click", handleSignOut);
  elements.brandFilterInput.addEventListener("input", handleQueryInput);
  elements.minPriceFilterInput.addEventListener("input", handlePriceInput);
  elements.maxPriceFilterInput.addEventListener("input", handlePriceInput);
  elements.clearAllFilters.addEventListener("click", clearAllFilters);

  // "Apply filters" button — scrolls to listings grid
  document.getElementById("applyFiltersBtn")?.addEventListener("click", () => {
    const listingsEl = document.getElementById("homeListings");
    if (listingsEl) listingsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Hero shortcut chips
  document.querySelectorAll("[data-shortcut]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.shortcut;

      if (key === "near-me") {
        applyNearMeFilter(btn);
        return;
      }

      // Reset all filters first
      state.filters.query = "";
      state.filters.category = "";
      state.filters.condition = "";
      state.filters.location = "";
      state.filters.delivery = "";
      state.filters.minPrice = "";
      state.filters.maxPrice = "";

      if (key === "under-100") {
        state.filters.maxPrice = "100";
      }
      // "new-arrivals" and "trending" → show all (newest first from Supabase)

      saveState();
      render();
      activateView("home");
      setTimeout(() => {
        document.getElementById("homeListings")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    });
  });

    elements.backToHomeButton.addEventListener("click", () => activateView("home"));
    elements.detailFavoriteButton.addEventListener("click", toggleSelectedFavorite);
      elements.toggleOfferButton.addEventListener("click", toggleOfferPanel);
      elements.openMessageButton.addEventListener("click", openDetailConversation);
      elements.editProductButton.addEventListener("click", editSelectedProduct);
      elements.deleteProductButton.addEventListener("click", deleteSelectedProduct);
      elements.offerForm.addEventListener("submit", handleOfferSubmit);
    elements.commentForm.addEventListener("submit", handleCommentSubmit);
    elements.ratingForm.addEventListener("submit", handleRatingSubmit);
    elements.chatForm.addEventListener("submit", handleChatSubmit);

  elements.navLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.viewTarget;
      const guestBlocked = ["sell", "messages", "profile"].includes(target);
      if (guestBlocked && !state.currentUser) {
        document.getElementById("authModalOverlay").hidden = false;
        return;
      }
      activateView(target);
    });
  });

  // Category strip
  document.querySelectorAll(".cat-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".cat-chip").forEach((c) => c.classList.remove("active-cat"));
      chip.classList.add("active-cat");
      state.filters.category = chip.dataset.cat || "";
      saveState();
      render();
    });
  });

  // Category banners
  document.querySelectorAll(".cat-banner").forEach((banner) => {
    banner.addEventListener("click", () => {
      const cat = banner.dataset.catFilter || "";
      state.filters.category = cat;
      // sync the cat-chip active state
      document.querySelectorAll(".cat-chip").forEach((c) => {
        c.classList.toggle("active-cat", (c.dataset.cat || "") === cat);
      });
      saveState();
      render();
      // scroll down to the listings
      document.querySelector(".marketplace-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Hero "Start selling" button → auth modal if not signed in
  document.querySelector(".hero-banner .solid-button")?.addEventListener("click", () => {
    if (state.currentUser) {
      activateView("sell");
    } else {
      document.getElementById("authModalOverlay").hidden = false;
    }
  });

  // Auth modal close (button + click outside)
  document.getElementById("authModalClose")?.addEventListener("click", () => {
    document.getElementById("authModalOverlay").hidden = true;
  });
  document.getElementById("authModalOverlay")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.hidden = true;
    }
  });

  bindValidationIndicators(elements.loginForm);
  bindValidationIndicators(elements.productForm);
  renderAuthMode();
}

async function initializeApp() {
  try {
    showFeedback(elements.authFeedback, getAuthHashMessage(), "info");
    if (isRecoveryHash()) {
      state.isPasswordRecovery = true;
      showFeedback(
        elements.passwordRecoveryFeedback,
        "Open your reset email link and set a new password below.",
        "info"
      );
    }
    if (window.location.protocol === "file:") {
      showFeedback(
        elements.authFeedback,
        "Please open the app from a web server (e.g. localhost) rather than directly from a file. Sign-in and publishing require a hosted URL.",
        "error"
      );
    }

    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (session?.user) {
      state.currentUser = await getOrCreateProfileFromSession(session, null);
    }

      await loadDataFromSupabase();
      setupRealtime();
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          state.currentUser = await getOrCreateProfileFromSession(session, null);
          await loadDataFromSupabase();
          render();
        }
        if (event === "PASSWORD_RECOVERY") {
          state.isPasswordRecovery = true;
          showFeedback(
            elements.passwordRecoveryFeedback,
            "Choose a new password below to finish resetting your account password.",
            "info"
          );
          renderAuth();
          activateView("home");
        }
      });
      render();
  } catch (error) {
    console.error(error);
    showFeedback(elements.authFeedback, error.message || "Could not initialize the live session.", "error");
    render();
  }
}

async function loadDataFromSupabase() {
  const [
    profilesRes,
    productsRes,
    brandsRes,
    hashtagsRes,
    commentsRes,
    offersRes,
    conversationsRes,
    messagesRes,
    favoritesRes,
    notificationsRes,
    commentLikesRes,
    ratingsRes,
  ] = await Promise.all([
    supabaseClient.from("profiles").select("*"),
    supabaseClient.from("products").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("product_brands").select("*"),
    supabaseClient.from("product_hashtags").select("*"),
    supabaseClient.from("product_comments").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("product_offers").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("conversations").select("*"),
    supabaseClient.from("messages").select("*").order("created_at", { ascending: true }),
    state.currentUser
      ? supabaseClient.from("favorites").select("*").eq("profile_id", state.currentUser.profileId)
      : Promise.resolve({ data: [] }),
    state.currentUser
      ? supabaseClient.from("notifications").select("*").eq("profile_id", state.currentUser.profileId)
      : Promise.resolve({ data: [] }),
    state.currentUser
      ? supabaseClient.from("comment_likes").select("*").eq("profile_id", state.currentUser.profileId)
      : Promise.resolve({ data: [] }),
    supabaseClient.from("product_ratings").select("*"),
  ]);

  const firstError = [
    profilesRes.error,
    productsRes.error,
    brandsRes.error,
    hashtagsRes.error,
    commentsRes.error,
    offersRes.error,
    conversationsRes.error,
    messagesRes.error,
    favoritesRes.error,
    notificationsRes.error,
    commentLikesRes.error,
    ratingsRes.error,
  ].find(Boolean);

  if (firstError) {
    throw firstError;
  }

  const profiles = profilesRes.data || [];
  const profileMap = new Map(profiles.map((profile) => [profile.id, profile]));
  const conversations = conversationsRes.data || [];
  const messages = messagesRes.data || [];

  if (state.currentUser?.profileId) {
    const currentProfile = profileMap.get(state.currentUser.profileId);
    if (currentProfile) {
      state.currentUser = profileRowToCurrentUser(currentProfile);
    }
  }

  state.products = (productsRes.data || []).map((product) => {
    const sellerProfile = profileMap.get(product.seller_profile_id);
    const rawConversations = conversations
      .filter((conversation) => conversation.product_id === product.id)
      .map((conversation) => ({
        ...conversation,
        sellerName: profileMap.get(conversation.seller_profile_id)?.full_name || "Seller",
        buyerName: profileMap.get(conversation.buyer_profile_id)?.full_name || "Buyer",
      }))
      .sort((left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime());
    const conversationIds = rawConversations.map((conversation) => conversation.id);

    const ratings = (ratingsRes.data || [])
      .filter((r) => r.product_id === product.id)
      .map((r) => ({
        id: r.id,
        buyerProfileId: r.buyer_profile_id,
        rating: r.rating,
        review: r.review || "",
        createdAt: formatTimestamp(r.created_at),
      }));
    const ratingValues = ratings.map((r) => r.rating);
    const ratingCount = ratingValues.length;
    const averageRating = ratingCount
      ? Math.round((ratingValues.reduce((a, b) => a + b, 0) / ratingCount) * 10) / 10
      : null;

    return {
      id: product.id,
      title: product.title,
      category: product.category,
      price: Number(product.price_aed),
      condition: product.condition,
      delivery: product.delivery,
      location: product.location,
      description: product.description,
      sellerName: sellerProfile?.full_name || "Seller",
      sellerProfileId: product.seller_profile_id,
      brands: [...new Set(
        (brandsRes.data || [])
          .filter((item) => item.product_id === product.id)
          .map((item) => item.brand_name)
      )],
      hashtags: [...new Set(
        (hashtagsRes.data || [])
          .filter((item) => item.product_id === product.id)
          .map((item) => item.hashtag)
      )],
      comments: (commentsRes.data || [])
        .filter((item) => item.product_id === product.id)
        .map((item) => ({
          id: item.id,
          author: profileMap.get(item.author_profile_id)?.full_name || "User",
          text: item.body,
          createdAt: formatTimestamp(item.created_at),
          likes: item.like_count || 0,
          authorProfileId: item.author_profile_id,
        })),
      offers: (offersRes.data || [])
        .filter((item) => item.product_id === product.id)
        .map((item) => ({
          id: item.id,
          buyer: profileMap.get(item.buyer_profile_id)?.full_name || "Buyer",
          amount: Number(item.amount_aed),
          message: item.message || "",
          createdAt: formatTimestamp(item.created_at),
          status: item.status,
          buyerProfileId: item.buyer_profile_id,
        })),
      messages: messages
        .filter((item) => conversationIds.includes(item.conversation_id))
        .map((item) => ({
          id: item.id,
          sender: profileMap.get(item.sender_profile_id)?.full_name || "User",
          recipient: profileMap.get(item.recipient_profile_id)?.full_name || "User",
          text: item.body,
          createdAt: formatTimestamp(item.created_at),
          createdAtRaw: item.created_at,
          isRead: item.is_read,
          senderProfileId: item.sender_profile_id,
          recipientProfileId: item.recipient_profile_id,
          conversationId: item.conversation_id,
        })),
      rawConversations,
      images: (() => {
        try {
          const parsed = JSON.parse(product.image_url || "null");
          return Array.isArray(parsed) && parsed.length ? parsed : [product.image_url || placeholderImage];
        } catch {
          return [product.image_url || placeholderImage];
        }
      })(),
      get image() { return this.images[0]; },
      ratings,
      ratingCount,
      averageRating,
    };
  });

  const allRatings = ratingsRes.data || [];
  state.myRatings = {};
  if (state.currentUser?.profileId) {
    allRatings
      .filter((r) => r.buyer_profile_id === state.currentUser.profileId)
      .forEach((r) => { state.myRatings[r.product_id] = r.rating; });
  }

  state.favoriteIds = (favoritesRes.data || []).map((item) => item.product_id);
  state.notifications = (notificationsRes.data || []).sort(
    (left, right) => new Date(right.created_at).getTime() - new Date(left.created_at).getTime()
  );
  state.commentLikeIds = (commentLikesRes.data || []).map((item) => item.comment_id);

  // If Supabase has no products yet, show local demo listings so the homepage looks alive
  if (state.products.length === 0) {
    state.products = defaultProducts;
  }

  if (state.selectedProductId && !state.products.some((product) => product.id === state.selectedProductId)) {
    state.selectedProductId = null;
  }

  if (!state.selectedProductId && state.products.length) {
    state.selectedProductId = state.products[0].id;
  }
}

function setupRealtime() {
  supabaseClient
    .channel("marketplace-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "products" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "product_brands" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "product_hashtags" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "product_offers" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "product_comments" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "comment_likes" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "conversations" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "favorites" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, refreshLiveData)
    .on("postgres_changes", { event: "*", schema: "public", table: "product_ratings" }, refreshLiveData)
    .subscribe();
}

async function refreshLiveData() {
  await loadDataFromSupabase();
  render();
}

async function getOrCreateProfileFromSession(session, fallbackName) {
  const { data: existing } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("auth_user_id", session.user.id)
    .maybeSingle();

  if (existing) {
    return profileRowToCurrentUser(existing);
  }

  const email = session.user.email || "";
  const fullName = fallbackName || email.split("@")[0] || "Seller";
  const usernameBase = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "") || "seller";
  const username = `${usernameBase}${Math.floor(Math.random() * 1000)}`;

  const { data, error } = await supabaseClient
    .from("profiles")
    .insert({
      auth_user_id: session.user.id,
      full_name: fullName,
      username,
      email,
      city: "Dubai",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return profileRowToCurrentUser(data);
}

function profileRowToCurrentUser(profile) {
  return {
    name: profile.full_name,
    email: profile.email,
    handle: `@${profile.username}`,
    profileId: profile.id,
    authUserId: profile.auth_user_id,
    avatarUrl: profile.avatar_url || "",
  };
}

function formatTimestamp(value) {
  if (!value) {
    return "Just now";
  }
  return new Date(value).toLocaleString();
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim().toLowerCase();
  const password = formData.get("password").toString();

  if (password.length < 6) {
    showFeedback(elements.authFeedback, "Please use a password with at least 6 characters.", "error");
    return;
  }

  void (async () => {
    try {
      if (state.authMode === "signUp" && state.currentUser?.profileId) {
        showFeedback(
          elements.authFeedback,
          "You are already signed in. Please sign out first, then create a new account if you want to test email confirmation.",
          "info"
        );
        return;
      }

      setButtonLoading(elements.authSubmitButton, true, state.authMode === "signUp" ? "Creating account" : "Signing in");
      showFeedback(
        elements.authFeedback,
        state.authMode === "signUp" ? "Creating your account..." : "Checking your account...",
        "info"
      );

      if (state.authMode === "signUp") {
        const signUp = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getEmailRedirectUrl(),
            data: { full_name: name },
          },
        });
        if (signUp.error) {
          showFeedback(elements.authFeedback, signUp.error.message, "error");
          return;
        }

        if (signUp.data.session) {
          state.currentUser = await getOrCreateProfileFromSession(signUp.data.session, name);
          showFeedback(
            elements.authFeedback,
            "Account created and signed in. Welcome to Soukly!",
            "success"
          );
        } else {
          const redirectNote = getEmailRedirectUrl()
            ? "Please check your email and click the confirmation link, then come back and sign in."
            : "Please open the app from a hosted URL so the confirmation email link can redirect correctly.";
          showFeedback(
            elements.authFeedback,
            `Your account was created. ${redirectNote}`,
            "info"
          );
          return;
        }
      } else {
        const signIn = await supabaseClient.auth.signInWithPassword({ email, password });
        if (signIn.error) {
          const signInMessage = String(signIn.error.message || "").toLowerCase().includes("invalid login credentials")
            ? "No account was found for this email and password. If this is a new user, switch to Create account first."
            : signIn.error.message;
          showFeedback(elements.authFeedback, signInMessage, "error");
          return;
        }
        state.currentUser = await getOrCreateProfileFromSession(signIn.data.session, name);
        showFeedback(elements.authFeedback, "Welcome back. You are signed in.", "success");
      }

      saveState();
      safeReset(form);
      refreshValidationIndicators(form);
      document.getElementById("authModalOverlay").hidden = true;
      await loadDataFromSupabase();
      render();
      activateView("profile");
    } catch (error) {
      console.error(error);
      showFeedback(elements.authFeedback, error.message || "Sign in could not be completed.", "error");
    } finally {
      setButtonLoading(elements.authSubmitButton, false, state.authMode === "signUp" ? "Create account" : "Sign in");
    }
  })();
}

function handleForgotPassword() {
  const email = elements.loginForm.querySelector('input[name="email"]')?.value.trim().toLowerCase() || "";
  if (!email) {
    showFeedback(elements.authFeedback, "Enter your email first, then tap Forgot password.", "error");
    return;
  }

  void (async () => {
    try {
      setButtonLoading(elements.forgotPasswordButton, true, "Sending reset link");
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: getEmailRedirectUrl(),
      });

      if (error) {
        showFeedback(elements.authFeedback, error.message, "error");
        return;
      }

      showFeedback(
        elements.authFeedback,
        "Password reset email sent. Open the link from your email, then set a new password here.",
        "success"
      );
    } catch (error) {
      showFeedback(elements.authFeedback, error.message || "Could not send reset email.", "error");
    } finally {
      setButtonLoading(elements.forgotPasswordButton, false, "Forgot password");
    }
  })();
}

function handlePasswordRecoverySubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const newPassword = formData.get("newPassword").toString();

  if (newPassword.length < 6) {
    showFeedback(elements.passwordRecoveryFeedback, "Please use a password with at least 6 characters.", "error");
    return;
  }

  void (async () => {
    try {
      setButtonLoading(elements.passwordRecoverySubmitButton, true, "Updating password");
      const { error } = await supabaseClient.auth.updateUser({ password: newPassword });
      if (error) {
        showFeedback(elements.passwordRecoveryFeedback, error.message, "error");
        return;
      }

      state.isPasswordRecovery = false;
      safeReset(form);
      showFeedback(elements.passwordRecoveryFeedback, "Password updated successfully. You can sign in normally now.", "success");
      renderAuth();
    } catch (error) {
      showFeedback(elements.passwordRecoveryFeedback, error.message || "Password update failed.", "error");
    } finally {
      setButtonLoading(elements.passwordRecoverySubmitButton, false, "Update password");
    }
  })();
}

function handleProductSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (window.location.protocol === "file:") {
    showFeedback(
      elements.productFeedback,
      "Please open the app from a hosted URL to publish products.",
      "error"
    );
    return;
  }
  if (!state.currentUser?.profileId) {
    showFeedback(elements.productFeedback, "Please sign in before publishing a product.", "error");
    activateView("home");
    return;
  }

  const formData = new FormData(form);
  void (async () => {
    const isEditing = Boolean(state.editingProductId);
    try {
      setButtonLoading(elements.productSubmitButton, true, isEditing ? "Saving changes" : "Publishing product");

      // Upload new photos to Supabase Storage
      let finalImageUrls = getEditingProduct()?.images || [];
      if (state.draftImages.length) {
        showFeedback(elements.productFeedback, `Uploading ${state.draftImages.length} photo(s) — please wait…`, "info");
        try {
          finalImageUrls = await uploadImagesToStorage(state.draftImages);
          showFeedback(elements.productFeedback, `${finalImageUrls.length} photo(s) uploaded ✓`, "success");
        } catch (uploadErr) {
          showFeedback(elements.productFeedback, uploadErr.message || "Image upload failed. Check your Supabase Storage bucket.", "error");
          setButtonLoading(elements.productSubmitButton, false, isEditing ? "Save changes" : "Publish product");
          return;
        }
      }

      showFeedback(elements.productFeedback, isEditing ? "Saving product changes..." : "Publishing your product...", "info");
      const storedImage = finalImageUrls.length > 1
        ? JSON.stringify(finalImageUrls)
        : (finalImageUrls[0] || placeholderImage);

      const productPayload = {
        seller_profile_id: state.currentUser.profileId,
        title: formData.get("title").toString().trim(),
        category: formData.get("category").toString(),
        price_aed: Number(formData.get("price")),
        condition: formData.get("condition").toString(),
        delivery: formData.get("delivery").toString(),
        location: formData.get("location").toString().trim(),
        description: formData.get("description").toString().trim(),
        image_url: storedImage,
      };

      const productQuery = state.editingProductId
        ? supabaseClient.from("products").update(productPayload).eq("id", state.editingProductId).select().single()
        : supabaseClient.from("products").insert(productPayload).select().single();

      const { data: inserted, error } = await productQuery;

      if (error) {
        const msg = error.message?.includes("row size")
          ? "Image is too large even after compression. Try a smaller photo (under 2 MB)."
          : error.message || "Could not save product.";
        showFeedback(elements.productFeedback, msg, "error");
        return;
      }

      const brands = buildBrands(formData.get("manualBrand").toString());
      const hashtags = buildHashtags(formData.get("hashtags").toString(), formData.get("description").toString());

      if (state.editingProductId) {
        await supabaseClient.from("product_brands").delete().eq("product_id", inserted.id);
        await supabaseClient.from("product_hashtags").delete().eq("product_id", inserted.id);
      }

      if (brands.length) {
        const { error: brandError } = await supabaseClient.from("product_brands").insert(
          brands.map((brand) => ({ product_id: inserted.id, brand_name: brand }))
        );
        if (brandError) {
          showFeedback(elements.productFeedback, brandError.message, "error");
          return;
        }
      }

      if (hashtags.length) {
        const { error: hashtagError } = await supabaseClient.from("product_hashtags").insert(
          hashtags.map((hashtag) => ({ product_id: inserted.id, hashtag }))
        );
        if (hashtagError) {
          showFeedback(elements.productFeedback, hashtagError.message, "error");
          return;
        }
      }

      state.draftImages = [];
      state.editingProductId = null;
      state.selectedProductId = inserted.id;
      state.isOfferOpen = false;
      saveState();
      resetProductEditor();
      resetImagePreview();
      safeReset(form);
      refreshValidationIndicators(form);
      await loadDataFromSupabase();
      render();
      showFeedback(elements.productFeedback, isEditing ? "Product updated successfully." : "Product published successfully.", "success");
      openProductDetail(inserted.id);
    } catch (error) {
      console.error(error);
      showFeedback(elements.productFeedback, error.message || "Publishing failed before the product could finish loading.", "error");
    } finally {
      setButtonLoading(elements.productSubmitButton, false, isEditing ? "Save changes" : "Publish product");
    }
  })();
}

function compressImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX = 800;
        let { width, height } = img;
        if (width > MAX || height > MAX) {
          if (width >= height) { height = Math.round((height / width) * MAX); width = MAX; }
          else { width = Math.round((width / height) * MAX); height = MAX; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        canvas.getContext("2d").drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.72));
      };
      img.src = /** @type {string} */ (e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

async function uploadSingleImage(base64, index) {
  const fetchRes = await fetch(base64);
  const blob = await fetchRes.blob();
  const path = `products/${Date.now()}_${Math.random().toString(36).slice(2)}_${index}.jpg`;

  const uploadPromise = supabaseClient.storage
    .from("product-images")
    .upload(path, blob, { contentType: "image/jpeg", upsert: false });

  // 25-second timeout per image
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Photo ${index + 1} upload timed out. Check your internet connection and Supabase Storage settings.`)), 25000)
  );

  const { data, error } = await Promise.race([uploadPromise, timeoutPromise]);
  if (error) {
    const hint = error.message?.includes("row") || error.message?.includes("policy") || error.message?.includes("Unauthorized")
      ? `${error.message} — Make sure the "product-images" Storage bucket exists and is Public in Supabase.`
      : error.message;
    throw new Error(`Photo ${index + 1}: ${hint}`);
  }

  const { data: urlData } = supabaseClient.storage
    .from("product-images")
    .getPublicUrl(data.path);
  return urlData.publicUrl;
}

async function uploadImagesToStorage(base64Array) {
  // Upload all images in parallel (much faster than sequential)
  return Promise.all(base64Array.map((base64, i) => uploadSingleImage(base64, i)));
}

function renderImagePreviewGrid() {
  if (!elements.imagePreviewGrid) return;
  if (!state.draftImages.length) {
    elements.imagePreviewGrid.innerHTML = "";
    return;
  }
  elements.imagePreviewGrid.innerHTML = state.draftImages.map((src, i) => `
    <div class="image-thumb-wrap">
      <img src="${src}" alt="Photo ${i + 1}" />
      ${i === 0 ? '<span class="image-thumb-badge">Main</span>' : ""}
      <button type="button" class="image-thumb-remove" data-remove-idx="${i}" title="Remove">✕</button>
    </div>
  `).join("");
  elements.imagePreviewGrid.querySelectorAll("[data-remove-idx]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.removeIdx);
      state.draftImages.splice(idx, 1);
      renderImagePreviewGrid();
      elements.imageFileName.textContent = state.draftImages.length
        ? `${state.draftImages.length} photo(s) selected`
        : "No photos selected yet.";
      refreshValidationIndicators(elements.productForm);
    });
  });
}

function handleImageChange(event) {
  const files = Array.from(event.currentTarget.files || []);
  if (!files.length) {
    state.draftImages = [];
    renderImagePreviewGrid();
    elements.imageFileName.textContent = "No photos selected yet.";
    refreshValidationIndicators(elements.productForm);
    return;
  }

  const MAX_PHOTOS = 4;
  const remaining = MAX_PHOTOS - state.draftImages.length;
  const toProcess = files.slice(0, remaining);

  if (files.length > remaining) {
    elements.imageFileName.textContent = `Max 4 photos — only first ${remaining} added.`;
  }

  Promise.all(toProcess.map(compressImage)).then((compressed) => {
    state.draftImages.push(...compressed);
    renderImagePreviewGrid();
    elements.imageFileName.textContent = `${state.draftImages.length} photo(s) selected`;
    refreshValidationIndicators(elements.productForm);
    // Reset file input so the same file can be re-selected
    event.currentTarget.value = "";
  });
}

function handleProfilePhotoChange(event) {
  const file = event.currentTarget.files?.[0];
  if (!file || !state.currentUser?.profileId) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const SIZE = 400;
      const canvas = document.createElement("canvas");
      canvas.width = SIZE; canvas.height = SIZE;
      const ctx = canvas.getContext("2d");
      // Crop to square from center
      const side = Math.min(img.width, img.height);
      const sx = (img.width - side) / 2;
      const sy = (img.height - side) / 2;
      ctx.drawImage(img, sx, sy, side, side, 0, 0, SIZE, SIZE);
      const avatarUrl = canvas.toDataURL("image/jpeg", 0.82);
      processAvatar(avatarUrl);
    };
    img.src = /** @type {string} */ (e.target.result);
  };
  reader.readAsDataURL(file);

  function processAvatar(avatarUrl) {
    if (!avatarUrl) return;

    void (async () => {
      try {
        showFeedback(elements.profileFeedback, "Saving profile photo...", "info");
        const { error } = await supabaseClient
          .from("profiles")
          .update({ avatar_url: avatarUrl })
          .eq("id", state.currentUser.profileId);

        if (error) {
          showFeedback(elements.profileFeedback, error.message, "error");
          return;
        }

        state.currentUser.avatarUrl = avatarUrl;
        saveState();
        await loadDataFromSupabase();
        renderProfile();
        showFeedback(elements.profileFeedback, "Profile photo updated.", "success");
      } catch (error) {
        showFeedback(elements.profileFeedback, error.message || "Could not update the profile photo.", "error");
      }
    })();
  }
}

function handleSignOut() {
  void (async () => {
    await supabaseClient.auth.signOut();
    state.currentUser = null;
    state.products = [];
    state.favoriteIds = [];
    state.notifications = [];
    state.commentLikeIds = [];
    state.activeConversationKey = null;
    state.selectedProductId = null;
    state.isPasswordRecovery = false;
    state.editingProductId = null;
    resetProductEditor();
    saveState();
    render();
    activateView("home");
  })();
}

function handleQueryInput(event) {
  state.filters.query = event.currentTarget.value.trim();
  saveState();
  render();
}

function handlePriceInput() {
  state.filters.minPrice = elements.minPriceFilterInput.value.trim();
  state.filters.maxPrice = elements.maxPriceFilterInput.value.trim();
  saveState();
  render();
}

// ── "Near me" — real GPS + reverse geocoding via Nominatim (no API key needed) ──
function applyNearMeFilter(btn) {
  if (!navigator.geolocation) {
    showHeroBannerFeedback("Your browser doesn't support location access.");
    return;
  }

  const originalLabel = btn.innerHTML;
  btn.innerHTML = "📍 Locating…";
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;

        // Nominatim reverse geocode — free, no API key
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
          { headers: { "User-Agent": "Soukly/1.0 (soukly.app)" } }
        );
        if (!res.ok) throw new Error("Geocode failed");
        const data = await res.json();

        const addr = data.address || {};
        // Pick the most useful area name (most specific first)
        const area =
          addr.suburb ||
          addr.neighbourhood ||
          addr.quarter ||
          addr.city_district ||
          addr.town ||
          addr.village ||
          addr.city ||
          "";

        // Reset filters then apply location query
        state.filters.query = area;
        state.filters.category = "";
        state.filters.condition = "";
        state.filters.location = "";
        state.filters.delivery = "";
        state.filters.minPrice = "";
        state.filters.maxPrice = "";

        saveState();
        render();
        activateView("home");

        if (area) {
          showHeroBannerFeedback(`📍 Showing listings near ${area}`);
        } else {
          showHeroBannerFeedback("Location detected but no area name found — showing all listings.");
        }

        setTimeout(() => {
          document.getElementById("homeListings")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);

      } catch (err) {
        showHeroBannerFeedback("Couldn't look up your area. Try searching manually.");
      } finally {
        btn.innerHTML = originalLabel;
        btn.disabled = false;
      }
    },
    (err) => {
      btn.innerHTML = originalLabel;
      btn.disabled = false;
      if (err.code === 1 /* PERMISSION_DENIED */) {
        showHeroBannerFeedback("Location access denied. Enable it in your browser settings, then try again.");
      } else {
        showHeroBannerFeedback("Couldn't get your location. Try searching manually.");
      }
    },
    { timeout: 10000, maximumAge: 60000 }
  );
}

// Show a temporary feedback message under the hero banner
function showHeroBannerFeedback(message) {
  let el = document.getElementById("heroBannerFeedback");
  if (!el) {
    el = document.createElement("div");
    el.id = "heroBannerFeedback";
    el.style.cssText =
      "margin-top:10px;padding:10px 16px;border-radius:14px;background:rgba(255,255,255,0.82);" +
      "border:1px solid rgba(242,140,0,0.2);font-size:0.85rem;color:var(--accent-dark);";
    const banner = document.querySelector(".hero-banner");
    if (banner) banner.appendChild(el);
  }
  el.textContent = message;
  el.hidden = false;
  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => { el.hidden = true; }, 5000);
}

function clearAllFilters() {
  state.filters.query = "";
  state.filters.category = "";
  state.filters.location = "";
  state.filters.condition = "";
  state.filters.delivery = "";
  state.filters.minPrice = "";
  state.filters.maxPrice = "";
  saveState();
  render();
}

function toggleSelectedFavorite() {
  const product = getSelectedProduct();
  if (!product) {
    return;
  }

  toggleFavorite(product.id);
}

function toggleFavorite(productId) {
  if (!state.currentUser?.profileId) {
    document.getElementById("authModalOverlay").hidden = false;
    return;
  }

  void (async () => {
    if (state.favoriteIds.includes(productId)) {
      await supabaseClient
        .from("favorites")
        .delete()
        .eq("profile_id", state.currentUser.profileId)
        .eq("product_id", productId);
    } else {
      await supabaseClient.from("favorites").insert({
        profile_id: state.currentUser.profileId,
        product_id: productId,
      });
    }

    await loadDataFromSupabase();
    render();
  })();
}

function toggleOfferPanel() {
  state.isOfferOpen = !state.isOfferOpen;
  saveState();
  renderDetail();
}

function handleOfferSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const product = getSelectedProduct();
  if (!product) {
    return;
  }
  if (!state.currentUser?.profileId) {
    document.getElementById("authModalOverlay").hidden = false;
    return;
  }
  if (product.isDemo) {
    showFeedback(elements.detailFeedback, "This is a demo listing. Sign up and add a real product to start receiving offers.", "info");
    return;
  }
  if (product.sellerProfileId === state.currentUser.profileId) {
    alert("Sellers cannot make offers on their own product.");
    return;
  }

  const formData = new FormData(form);
  const amount = Number(formData.get("amount"));
  const message = formData.get("message").toString().trim();

  if (!amount) {
    return;
  }

  void (async () => {
    const { error } = await supabaseClient.from("product_offers").insert({
      product_id: product.id,
      buyer_profile_id: state.currentUser.profileId,
      amount_aed: amount,
      message,
      status: "pending",
    });

    if (error) {
      alert(error.message);
      return;
    }

    state.isOfferOpen = true;
    saveState();
      safeReset(form);
      await loadDataFromSupabase();
      renderDetail();
    })();
}

function handleCommentSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const product = getSelectedProduct();
  if (!product) {
    return;
  }
  if (!state.currentUser?.profileId) {
    alert("Please sign in before posting a comment.");
    return;
  }

  const formData = new FormData(form);
  const text = formData.get("comment").toString().trim();
  if (!text) {
    return;
  }

  void (async () => {
    const { error } = await supabaseClient.from("product_comments").insert({
      product_id: product.id,
      author_profile_id: state.currentUser.profileId,
      body: text,
      like_count: 0,
    });

    if (error) {
      alert(error.message);
      return;
    }

      safeReset(form);
      await loadDataFromSupabase();
      renderDetail();
    })();
}

function clearSingleFilter(key) {
  if (!(key in state.filters)) {
    return;
  }
  state.filters[key] = "";
  saveState();
  render();
}

function activateView(viewName) {
  elements.navLinks.forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === viewName);
  });
  document.querySelectorAll(".mobile-nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === viewName);
  });
  elements.viewPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `view-${viewName}`);
  });
}

function render() {
  renderAuth();
  renderFilters();
  renderListings();
  renderProfile();
  renderDetail();
  renderMessages();
  renderNotifications();
}

function renderAuth() {
  renderAuthMode();
  if (state.currentUser) {
    elements.authStatus.textContent = `Signed in as ${state.currentUser.name}`;
    elements.authHint.textContent = "You can now add products, save favorites, make offers, and message.";
    elements.signOutButton.hidden = false;
  } else {
    elements.authStatus.textContent = "Guest browsing";
    elements.authHint.textContent = "Sign in to publish products, save favorites, comment, and chat.";
    elements.signOutButton.hidden = true;
  }
  elements.favoritesCount.textContent = String(state.favoriteIds.length);
  elements.notificationsCount.textContent = String(getNotificationsCount());
}

function renderFilters() {
  elements.brandFilterInput.value = state.filters.query;
  elements.minPriceFilterInput.value = state.filters.minPrice;
  elements.maxPriceFilterInput.value = state.filters.maxPrice;
  renderChipGroup(elements.categoryFilterChips, "category", "All", getAllCategories(), state.filters.category);
  renderChipGroup(elements.locationFilterChips, "location", "All", getAllLocations(), state.filters.location);
  renderChipGroup(elements.conditionFilterChips, "condition", "All", getAllConditions(), state.filters.condition);
  renderChipGroup(elements.deliveryFilterChips, "delivery", "All", getAllDeliveryTypes(), state.filters.delivery);
  renderChipGroup(elements.brandFilterChips, "brand", "All", getAllBrands(), state.filters.query, true);
  renderActiveFilters();
}

function renderChipGroup(container, key, allLabel, values, activeValue) {
  const selected = (activeValue || "").toLowerCase();
  const chips = [
    `<button type="button" class="filter-chip${selected ? "" : " active"}" data-filter-key="${key}" data-filter-value="">${allLabel}</button>`,
  ];

  values.forEach((value) => {
    const isActive = selected === value.toLowerCase();
    chips.push(
      `<button type="button" class="filter-chip${isActive ? " active" : ""}" data-filter-key="${key}" data-filter-value="${escapeHtml(
        value
      )}">${escapeHtml(value)}</button>`
    );
  });

  container.innerHTML = chips.join("");
  container.querySelectorAll("[data-filter-key]").forEach((button) => {
    button.addEventListener("click", () => {
      const filterKey = button.getAttribute("data-filter-key");
      const value = button.getAttribute("data-filter-value") || "";
      if (filterKey === "brand") {
        state.filters.query = value;
      } else {
        state.filters[filterKey] = value;
      }
      saveState();
      render();
    });
  });
}

function renderActiveFilters() {
  const items = [];
  if (state.filters.query) items.push({ key: "query", label: `Search: ${state.filters.query}` });
  if (state.filters.category) items.push({ key: "category", label: `Category: ${state.filters.category}` });
  if (state.filters.location) items.push({ key: "location", label: `Location: ${state.filters.location}` });
  if (state.filters.condition) items.push({ key: "condition", label: `Condition: ${state.filters.condition}` });
  if (state.filters.delivery) items.push({ key: "delivery", label: `Delivery: ${state.filters.delivery}` });
  if (state.filters.minPrice) items.push({ key: "minPrice", label: `Min AED: ${state.filters.minPrice}` });
  if (state.filters.maxPrice) items.push({ key: "maxPrice", label: `Max AED: ${state.filters.maxPrice}` });

  if (!items.length) {
    elements.activeFilters.hidden = true;
    elements.activeFilterRow.innerHTML = "";
    return;
  }

  elements.activeFilters.hidden = false;
  elements.activeFilterRow.innerHTML = items
    .map(
      (item) => `<button type="button" class="active-filter-chip" data-remove-filter="${escapeHtml(item.key)}"><span>${escapeHtml(
        item.label
      )}</span><strong>x</strong></button>`
    )
    .join("");

  elements.activeFilterRow.querySelectorAll("[data-remove-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      clearSingleFilter(button.getAttribute("data-remove-filter") || "");
    });
  });
}

function renderListings() {
  elements.homeListings.innerHTML = "";
  elements.profileListings.innerHTML = "";
  elements.favoriteListings.innerHTML = "";

  const filteredProducts = getFilteredProducts();
  if (!filteredProducts.length) {
    elements.homeListings.innerHTML =
      '<div class="empty-state">No products match the selected filters yet. Try another combination or clear the filters.</div>';
  }
  filteredProducts.forEach((product) => {
    elements.homeListings.appendChild(createListingCard(product));
  });

    const ownProducts = state.currentUser
      ? state.products.filter((product) => product.sellerProfileId === state.currentUser.profileId)
      : [];
  if (!ownProducts.length) {
    elements.profileListings.innerHTML =
      '<div class="empty-state">No products yet. Add your first listing to build your profile.</div>';
  } else {
    ownProducts.forEach((product) => elements.profileListings.appendChild(createListingCard(product)));
  }

  const favorites = state.products.filter((product) => state.favoriteIds.includes(product.id));
  if (!favorites.length) {
    elements.favoriteListings.innerHTML =
      '<div class="empty-state">No favorites yet. Save products from the home feed or detail page.</div>';
  } else {
    favorites.forEach((product) => elements.favoriteListings.appendChild(createListingCard(product)));
  }
}

function renderProfile() {
  // Profile tab switching
  document.querySelectorAll("[data-profile-tab]").forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll("[data-profile-tab]").forEach((t) => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");
      const which = tab.dataset.profileTab;
      const listingsEl = document.getElementById("profileTabListings");
      const savedEl = document.getElementById("profileTabSaved");
      if (listingsEl) listingsEl.hidden = (which !== "listings");
      if (savedEl) savedEl.hidden = (which !== "saved");
    };
  });

  // "Follow" button — guest → open auth modal
  const followBtn = document.getElementById("profileFollowBtn");
  if (followBtn) {
    followBtn.hidden = !!state.currentUser; // hide for own profile
    followBtn.onclick = () => {
      if (!state.currentUser) document.getElementById("authModalOverlay").hidden = false;
    };
  }

  if (!state.currentUser) {
    elements.profileName.textContent = "Guest Seller";
    elements.profileHandle.textContent = "@soukly · Dubai, UAE";
    elements.profileBio.textContent = "Sign in to create your seller identity and start listing products.";
    elements.profileAvatar.textContent = "SO";
    elements.profilePhotoUpload.hidden = true;
    elements.statListings.textContent = "0";
    elements.statRating.textContent = "—";
    elements.statDelivery.textContent = "0";
    const statFollowers = document.getElementById("statFollowers");
    if (statFollowers) statFollowers.textContent = "0";
    return;
  }

  const ownProducts = state.products.filter((product) => product.sellerProfileId === state.currentUser.profileId);
  const initials = state.currentUser.name
    .split(" ").filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  elements.profileName.textContent = state.currentUser.name;
  elements.profileHandle.textContent = `${state.currentUser.handle} · Dubai, UAE`;
  elements.profileBio.textContent =
    `Fashion, home & beauty finds. Based in Dubai. ${state.favoriteIds.length} saved item(s).`;
  elements.profileAvatar.innerHTML = state.currentUser.avatarUrl
    ? `<img src="${escapeHtml(state.currentUser.avatarUrl)}" alt="${escapeHtml(state.currentUser.name)}" />`
    : initials;
  elements.profilePhotoUpload.hidden = false;

  const allRatingsForSeller = ownProducts.flatMap((p) => p.ratings || []);
  const sellerAvg = allRatingsForSeller.length
    ? Math.round((allRatingsForSeller.reduce((a, r) => a + r.rating, 0) / allRatingsForSeller.length) * 10) / 10
    : null;

  elements.statListings.textContent = String(ownProducts.length);
  elements.statRating.textContent = sellerAvg !== null ? String(sellerAvg) : "—";
  elements.statDelivery.textContent = "0";

  const statFollowers = document.getElementById("statFollowers");
  if (statFollowers) statFollowers.textContent = String(state.favoriteIds.length);
}

function renderDetail() {
  const product = getSelectedProduct();
  if (!product) return;

  const images = product.images || [product.image || placeholderImage];
  elements.detailImage.src = images[0];

  // Multi-image gallery thumbnails
  let gallery = document.getElementById("detailGallery");
  if (images.length > 1) {
    if (!gallery) {
      gallery = document.createElement("div");
      gallery.id = "detailGallery";
      gallery.className = "detail-gallery";
      elements.detailImage.parentElement.appendChild(gallery);
    }
    gallery.innerHTML = images.map((src, i) => `
      <div class="detail-gallery-thumb${i === 0 ? " active" : ""}" data-gallery-idx="${i}">
        <img src="${src}" alt="Photo ${i + 1}" />
      </div>
    `).join("");
    gallery.querySelectorAll("[data-gallery-idx]").forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const idx = Number(thumb.dataset.galleryIdx);
        elements.detailImage.src = images[idx];
        gallery.querySelectorAll(".detail-gallery-thumb").forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
  } else {
    gallery?.remove();
  }
  elements.detailTitle.textContent = product.title;
  elements.detailPrice.textContent = `${product.price} AED`;
  elements.detailDescription.textContent = product.description;
  elements.detailSeller.textContent = product.sellerName;
  elements.detailLocation.textContent = product.location;
  elements.detailCondition.textContent = product.condition;
  elements.detailDelivery.textContent = product.delivery;
  elements.detailFavoriteButton.textContent = state.favoriteIds.includes(product.id) ? "Saved" : "Save item";
  const isOwner = Boolean(state.currentUser && product.sellerProfileId === state.currentUser.profileId);
  elements.toggleOfferButton.hidden = isOwner;
  elements.openMessageButton.textContent = getDetailMessageLabel(product);
  elements.editProductButton.hidden = !isOwner;
  elements.deleteProductButton.hidden = !isOwner;

  // Adjust action grid: single column when offer button is hidden (owner view)
  const actionGrid = document.getElementById("detailActionGrid");
  if (actionGrid) {
    actionGrid.classList.toggle("single-col", isOwner);
  }

  // Tags row: grey pills for category + condition, orange for brand
  const greyTags = [product.category, product.condition]
    .filter(Boolean)
    .map((t) => `<span class="detail-tag-grey">${escapeHtml(t)}</span>`)
    .join("");
  const brandTags = (product.brands || [])
    .map((b) => `<span class="detail-tag-brand">${escapeHtml(b)}</span>`)
    .join("");
  elements.detailTags.innerHTML = greyTags + brandTags;

  // Delivery pills
  const deliveryRowEl = document.getElementById("detailDeliveryRow");
  if (deliveryRowEl) {
    const methods = (product.delivery || "").split(/\s+or\s+/i).map((d) => d.trim()).filter(Boolean);
    deliveryRowEl.innerHTML = methods
      .map((d) => `<span class="detail-delivery-pill">${escapeHtml(d)}</span>`)
      .join("");
  }

  // Seller avatar initials
  const sellerAvatarEl = document.getElementById("detailSellerAvatar");
  if (sellerAvatarEl) {
    const initials = (product.sellerName || "?")
      .split(" ").filter(Boolean).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
    sellerAvatarEl.textContent = initials;
  }

  // Seller rating text
  const sellerRatingTextEl = document.getElementById("detailSellerRatingText");
  if (sellerRatingTextEl) {
    const rating = product.averageRating;
    const count = product.ratingCount || 0;
    sellerRatingTextEl.textContent = rating != null
      ? `${rating} · ${count} sale${count !== 1 ? "s" : ""}`
      : `${count} sale${count !== 1 ? "s" : ""}`;
  }

  // View profile button
  const viewProfileBtn = document.getElementById("detailViewProfile");
  if (viewProfileBtn) {
    viewProfileBtn.onclick = () => { if (isOwner) activateView("profile"); };
    viewProfileBtn.style.display = isOwner ? "" : "none";
  }

  // Hashtags section
  const hashtagsEl = document.getElementById("detailHashtags");
  const hashtagsSectionEl = document.getElementById("detailHashtagsSection");
  const hashtagsDividerEl = document.getElementById("detailHashtagsDivider");
  if (hashtagsEl) {
    const hashtags = product.hashtags || [];
    hashtagsEl.innerHTML = hashtags
      .map((tag) => `<button type="button" class="detail-hashtag-pill" data-hashtag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
      .join("");
    if (hashtagsSectionEl) hashtagsSectionEl.hidden = hashtags.length === 0;
    if (hashtagsDividerEl) hashtagsDividerEl.hidden = hashtags.length === 0;
    bindHashtagClicks(hashtagsEl);
  }

  // Demo product banner
  const demoBanner = document.getElementById("demoBanner");
  if (product.isDemo) {
    if (!demoBanner) {
      const banner = document.createElement("div");
      banner.id = "demoBanner";
      banner.className = "form-feedback is-info";
      banner.innerHTML = `👋 <strong>Demo listing</strong> — Sign up free to buy, sell, and chat on Soukly. <button class="ghost-button mini-button" id="demoBannerSignup" style="margin-left:10px">Sign up</button>`;
      elements.detailFeedback.parentNode.insertBefore(banner, elements.detailFeedback.nextSibling);
      document.getElementById("demoBannerSignup")?.addEventListener("click", () => {
        document.getElementById("authModalOverlay").hidden = false;
      });
    }
    elements.toggleOfferButton.hidden = true;
    elements.openMessageButton.hidden = true;
    elements.detailFavoriteButton.hidden = true;
  } else {
    demoBanner?.remove();
    elements.detailFavoriteButton.hidden = false;
    elements.openMessageButton.hidden = false;
  }

  elements.offerPanel.hidden = !state.isOfferOpen;
  renderOfferHistory(product);
  renderRating(product);
  renderComments(product);
}

function renderMessages() {
  const conversations = getConversationsForCurrentUser();
  safeReset(elements.chatForm);
  setChatSubmitDisabled(!state.currentUser);

  if (!conversations.length) {
    state.activeConversationKey = null;
    elements.conversationList.innerHTML =
      '<div class="empty-state compact">No conversations yet. Start from a product detail page.</div>';
    elements.chatThreadHeader.textContent = "Select a conversation";
    elements.chatThread.innerHTML =
      '<div class="empty-state compact">Messages between buyer and seller will appear here.</div>';
    setChatSubmitDisabled(true);
    return;
  }

    if (!conversations.some((conversation) => String(conversation.id) === String(state.activeConversationKey))) {
      state.activeConversationKey = String(conversations[0].id);
      saveState();
    }

  elements.conversationList.innerHTML = conversations
    .map((conversation) => {
        const active = String(conversation.id) === String(state.activeConversationKey);
        const unreadCount = conversation.messages.filter(
          (message) => message.recipientProfileId === state.currentUser?.profileId && !message.isRead
        ).length;

      return `
        <button type="button" class="conversation-item${active ? " active" : ""}" data-conversation-key="${escapeHtml(
          conversation.id
        )}">
          <strong>${escapeHtml(conversation.product.title)}</strong>
          <span>${escapeHtml(conversation.otherUser)}</span>
          ${unreadCount ? `<small>${unreadCount} new</small>` : ""}
        </button>
      `;
    })
    .join("");

  elements.conversationList.querySelectorAll("[data-conversation-key]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeConversationKey = button.getAttribute("data-conversation-key") || null;
      const activeConversation = getActiveConversation();
      if (activeConversation) {
        void markConversationAsRead(activeConversation.id);
      }
      saveState();
      renderMessages();
      renderAuth();
    });
  });

  const conversation = getActiveConversation();
  if (!conversation) {
    return;
  }

  setChatSubmitDisabled(false);
  void markConversationAsRead(conversation.id);
  saveState();
  renderAuth();
  elements.chatThreadHeader.textContent = `${conversation.product.title} with ${conversation.otherUser}`;
  elements.chatThread.innerHTML = conversation.messages
    .map((message) => {
      const own = message.senderProfileId === state.currentUser?.profileId;
      return `
        <article class="chat-bubble${own ? " own" : ""}">
          <strong>${escapeHtml(message.sender)}</strong>
          <p>${escapeHtml(message.text)}</p>
          <small>${escapeHtml(message.createdAt)}</small>
        </article>
      `;
    })
    .join("");
}

function renderNotifications() {
  if (!elements.notificationsList) return;

  if (!state.currentUser) {
    elements.notificationsList.innerHTML = '<div class="empty-state">Sign in to see your notifications.</div>';
    return;
  }

  const notifications = [...(state.notifications || [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (!notifications.length) {
    elements.notificationsList.innerHTML = '<div class="empty-state">No notifications yet. Offers and messages will appear here.</div>';
    return;
  }

  const typeIcon = (type) => {
    if (type === "new_message" || type === "message") return "💬";
    if (type === "new_offer" || type === "offer_pending" || type === "offer") return "💰";
    if (type === "offer_accepted") return "✅";
    if (type === "offer_rejected") return "❌";
    return "🔔";
  };

  elements.notificationsList.innerHTML = notifications
    .map((n) => {
      const isUnread = !n.is_read;
      return `
        <article class="notification-item${isUnread ? " unread" : ""}"
          data-notif-type="${escapeHtml(n.type || "")}"
          data-notif-product="${escapeHtml(n.related_product_id || "")}"
          data-notif-conversation="${escapeHtml(n.related_conversation_id || "")}"
          data-notif-offer="${escapeHtml(n.related_offer_id || "")}">
          <div class="notification-dot${isUnread ? " visible" : ""}"></div>
          <div class="notification-icon">${typeIcon(n.type)}</div>
          <div class="notification-body">
            <strong>${escapeHtml(n.title)}</strong>
            <p>${escapeHtml(n.body)}</p>
            <small>${escapeHtml(formatTimestamp(n.created_at))}</small>
          </div>
        </article>
      `;
    })
    .join("");

  elements.notificationsList.querySelectorAll(".notification-item").forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const productId = item.getAttribute("data-notif-product");
      const conversationId = item.getAttribute("data-notif-conversation");
      const offerId = item.getAttribute("data-notif-offer");

      if (conversationId) {
        state.activeConversationKey = conversationId;
        saveState();
        void loadDataFromSupabase().then(() => {
          renderMessages();
          renderAuth();
          activateView("messages");
        });
      } else if (productId) {
        state.selectedProductId = productId;
        state.isOfferOpen = Boolean(offerId);
        saveState();
        void markProductNotificationsAsRead(productId);
        void loadDataFromSupabase().then(() => {
          render();
          activateView("detail");
        });
      }
    });
  });
}

function renderOfferHistory(product) {
  if (!product.offers.length) {
    elements.offerHistory.innerHTML = '<div class="empty-state compact">No offers yet for this item.</div>';
    return;
  }

    const canModerate = Boolean(state.currentUser && state.currentUser.profileId === product.sellerProfileId);
  elements.offerHistory.innerHTML = product.offers
    .map((offer) => {
      const actions = canModerate
        ? `
            <div class="offer-decision-actions">
              <button type="button" class="ghost-button mini-button" data-offer-action="accepted" data-offer-id="${offer.id}">Accept</button>
              <button type="button" class="ghost-button mini-button" data-offer-action="rejected" data-offer-id="${offer.id}">Reject</button>
            </div>
          `
        : "";

      return `
        <article class="offer-item">
          <div class="offer-item-header">
            <strong>${escapeHtml(offer.buyer)}</strong>
            <span>${offer.amount} AED</span>
          </div>
          <div class="offer-status-row">
            <span class="offer-status ${escapeHtml(offer.status)}">${escapeHtml(offer.status)}</span>
            ${actions}
          </div>
          <p>${escapeHtml(offer.message || "No note added.")}</p>
          <small>${escapeHtml(offer.createdAt)}</small>
        </article>
      `;
    })
      .join("");

  if (!canModerate) {
    return;
  }

  elements.offerHistory.querySelectorAll("[data-offer-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const offerId = button.getAttribute("data-offer-id") || "";
        const status = button.getAttribute("data-offer-action") || "pending";
        updateOfferStatus(product.id, offerId, status, button);
      });
  });
}

function renderStars(value, max = 5) {
  let html = "";
  for (let i = 1; i <= max; i++) {
    html += `<span class="star${i <= value ? " filled" : ""}">&#9733;</span>`;
  }
  return html;
}

function renderRating(product) {
  const myRating = state.myRatings[product.id] || 0;
  const isOwner = Boolean(state.currentUser && product.sellerProfileId === state.currentUser.profileId);
  const hasAcceptedOffer = product.offers.some(
    (o) => o.status === "accepted" && o.buyerProfileId === state.currentUser?.profileId
  );
  const canRate = !isOwner && Boolean(state.currentUser?.profileId) && hasAcceptedOffer;

  if (product.averageRating !== null) {
    elements.ratingSummary.innerHTML = `
      <div class="rating-display">
        <span class="rating-stars">${renderStars(Math.round(product.averageRating))}</span>
        <span class="rating-value">${product.averageRating}</span>
        <span class="rating-count">(${product.ratingCount} review${product.ratingCount !== 1 ? "s" : ""})</span>
      </div>
    `;
  } else {
    elements.ratingSummary.innerHTML = `<p class="empty-state compact">No ratings yet for this item.</p>`;
  }

  if (!canRate) {
    elements.ratingFormWrap.hidden = true;
    return;
  }

  elements.ratingFormWrap.hidden = false;
  showFeedback(elements.ratingFeedback, "", "info");

  const starButtons = elements.starInput.querySelectorAll(".star-btn");
  starButtons.forEach((btn) => {
    const val = Number(btn.dataset.value);
    btn.classList.toggle("selected", val <= myRating);
    btn.onclick = () => {
      elements.ratingValueInput.value = String(val);
      starButtons.forEach((b) => b.classList.toggle("selected", Number(b.dataset.value) <= val));
    };
  });

  if (myRating) {
    elements.ratingValueInput.value = String(myRating);
    elements.ratingSubmitButton.textContent = "Update rating";
    elements.ratingSubmitButton.dataset.defaultLabel = "Update rating";
    showFeedback(elements.ratingFeedback, `You rated this product ${myRating} star${myRating !== 1 ? "s" : ""}. You can update your rating.`, "info");
  } else {
    elements.ratingValueInput.value = "0";
    elements.ratingSubmitButton.textContent = "Submit rating";
    elements.ratingSubmitButton.dataset.defaultLabel = "Submit rating";
  }
}

function handleRatingSubmit(event) {
  event.preventDefault();
  const product = getSelectedProduct();
  if (!product || !state.currentUser?.profileId) return;

  const formData = new FormData(event.currentTarget);
  const rating = Number(formData.get("ratingValue"));
  const review = formData.get("review").toString().trim();

  if (!rating || rating < 1 || rating > 5) {
    showFeedback(elements.ratingFeedback, "Please select a star rating before submitting.", "error");
    return;
  }

  void (async () => {
    try {
      setButtonLoading(elements.ratingSubmitButton, true, "Saving rating");
      const existing = product.ratings.find((r) => r.buyerProfileId === state.currentUser.profileId);

      if (existing) {
        const { error } = await supabaseClient
          .from("product_ratings")
          .update({ rating, review: review || null })
          .eq("id", existing.id);
        if (error) { showFeedback(elements.ratingFeedback, error.message, "error"); return; }
      } else {
        const { error } = await supabaseClient.from("product_ratings").insert({
          product_id: product.id,
          buyer_profile_id: state.currentUser.profileId,
          rating,
          review: review || null,
        });
        if (error) { showFeedback(elements.ratingFeedback, error.message, "error"); return; }
      }

      await loadDataFromSupabase();
      render();
      showFeedback(elements.ratingFeedback, `Your ${rating}-star rating has been saved. Thank you!`, "success");
    } catch (error) {
      showFeedback(elements.ratingFeedback, error.message || "Could not save rating.", "error");
    } finally {
      setButtonLoading(elements.ratingSubmitButton, false, state.myRatings[product.id] ? "Update rating" : "Submit rating");
    }
  })();
}

function renderComments(product) {
  if (!product.comments.length) {
    elements.commentList.innerHTML = '<div class="empty-state compact">No comments yet. Start the conversation.</div>';
    return;
  }

  elements.commentList.innerHTML = product.comments
    .map(
      (comment) => {
        const liked = state.commentLikeIds.includes(comment.id);
        return `
          <article class="comment-item">
            <div class="comment-item-header">
              <strong>${escapeHtml(comment.author)}</strong>
              <small>${escapeHtml(comment.createdAt)}</small>
            </div>
          <p>${escapeHtml(comment.text)}</p>
          <button type="button" class="ghost-button mini-button" data-comment-like="${comment.id}" ${
            liked ? "disabled" : ""
          }>
            ${liked ? "Liked" : "Like"} (${comment.likes || 0})
          </button>
          </article>
        `
      }
    )
    .join("");

  elements.commentList.querySelectorAll("[data-comment-like]").forEach((button) => {
    button.addEventListener("click", () => {
      const commentId = button.getAttribute("data-comment-like") || "";
      likeComment(product.id, commentId);
    });
  });
}

function createListingCard(product) {
  const card = document.createElement("article");
  card.className = "listing-card interactive-card";
  const isFavorite = state.favoriteIds.includes(product.id);
  const isOwner = Boolean(state.currentUser?.profileId && product.sellerProfileId === state.currentUser.profileId);

  // Grey outlined pills: category + condition
  const categoryConditionMarkup = [product.category, product.condition]
    .filter(Boolean)
    .map((t) => `<span class="card-pill">${escapeHtml(t)}</span>`)
    .join("");

  // Orange/amber filled pills: brand (separate row)
  const brandPills = (product.brands || [])
    .map((brand) => `<span class="card-pill brand-pill">${escapeHtml(brand)}</span>`)
    .join("");
  const brandRow = brandPills ? `<div class="listing-brand-row">${brandPills}</div>` : "";

  // Delivery shown as faded pill in footer
  const deliveryLabel = product.delivery
    ? `<span class="card-delivery-pill">${escapeHtml(product.delivery.split(" or ")[0].trim())}</span>`
    : "";

  card.innerHTML = `
    <div class="listing-card-top">
      <button type="button" class="favorite-button${isFavorite ? " active" : ""}" data-favorite-id="${product.id}">
        ${isFavorite ? "Saved" : "Save"}
      </button>
      ${isOwner ? `<button type="button" class="ghost-button mini-button" data-edit-product-id="${product.id}">Edit</button>` : ""}
    </div>
    <button type="button" class="listing-click-target" data-product-id="${product.id}">
      <div class="listing-image-wrap">
        <img src="${product.image || placeholderImage}" alt="${escapeHtml(product.title)}" class="listing-image" />
      </div>
      <div class="listing-body">
        <div class="listing-meta">
          ${categoryConditionMarkup}
        </div>
        ${brandRow}
        <div class="listing-copy">
          <h4>${escapeHtml(product.title)}</h4>
          <p>${escapeHtml(product.description)}</p>
        </div>
        <div class="price" style="margin: 6px 0 10px;">${product.price ? product.price + " AED" : "— AED"}</div>
        <div class="listing-footer" style="margin-top:0;">
          <strong style="font-size:0.88rem;">${escapeHtml(product.sellerName)}</strong>
          ${product.averageRating !== null
            ? `<small class="card-rating">&#9733; ${product.averageRating}</small>`
            : deliveryLabel}
        </div>
      </div>
    </button>
  `;

  card.querySelector("[data-product-id]")?.addEventListener("click", () => openProductDetail(product.id));
  card.querySelector("[data-favorite-id]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFavorite(product.id);
  });
  card.querySelector("[data-edit-product-id]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    startEditingProduct(product.id);
  });
  return card;
}

function openProductDetail(productId) {
  state.selectedProductId = productId;
  state.isOfferOpen = false;
  saveState();
  renderDetail();
  void markProductNotificationsAsRead(productId);
  activateView("detail");
}

function openDetailConversation() {
  const product = getSelectedProduct();
  if (!product) {
    return;
  }
  if (!state.currentUser?.profileId) {
    document.getElementById("authModalOverlay").hidden = false;
    return;
  }
  if (product.isDemo) {
    showFeedback(elements.detailFeedback, "This is a demo listing. Sign up and publish your own product to start chatting with buyers.", "info");
    return;
  }

  void (async () => {
    const sellerProfileId = product.sellerProfileId;
    let buyerProfileId = state.currentUser.profileId;

    if (sellerProfileId === buyerProfileId) {
      const existingForSeller = product.rawConversations?.[0];
      if (!existingForSeller) {
        alert("No buyer conversation exists yet for this product.");
        return;
      }
      state.activeConversationKey = `${existingForSeller.id}`;
      renderMessages();
      renderAuth();
      activateView("messages");
      return;
    }

    const { data: existingConversation } = await supabaseClient
      .from("conversations")
      .select("*")
      .eq("product_id", product.id)
      .eq("seller_profile_id", sellerProfileId)
      .eq("buyer_profile_id", buyerProfileId)
      .maybeSingle();

    let conversationId = existingConversation?.id;
    if (!conversationId) {
      const { data, error } = await supabaseClient
        .from("conversations")
        .insert({
          product_id: product.id,
          seller_profile_id: sellerProfileId,
          buyer_profile_id: buyerProfileId,
        })
        .select()
        .single();

      if (error) {
        alert(error.message);
        return;
      }
      conversationId = data.id;
    }

    state.activeConversationKey = `${conversationId}`;
    saveState();
    await loadDataFromSupabase();
    renderMessages();
    renderAuth();
    activateView("messages");
  })();
}

function handleChatSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!state.currentUser?.profileId) {
    alert("Please sign in before sending messages.");
    return;
  }

  const conversation = getActiveConversation();
  if (!conversation) {
    alert("Select a conversation first.");
    return;
  }

  const formData = new FormData(form);
  const text = formData.get("message").toString().trim();
  if (!text) {
    return;
  }

  void (async () => {
    const recipientProfileId =
      state.currentUser.profileId === conversation.product.sellerProfileId
        ? conversation.buyerProfileId
        : conversation.product.sellerProfileId;

    const { error } = await supabaseClient.from("messages").insert({
      conversation_id: conversation.id,
      sender_profile_id: state.currentUser.profileId,
      recipient_profile_id: recipientProfileId,
      body: text,
      is_read: false,
    });

    if (error) {
      alert(error.message);
      return;
    }

    safeReset(form);
    await loadDataFromSupabase();
    renderMessages();
    renderAuth();
  })();
}

function getFilteredProducts() {
  const query = state.filters.query.trim().toLowerCase();
  const activeCategory = state.filters.category.trim().toLowerCase();
  const activeLocation = state.filters.location.trim().toLowerCase();
  const activeCondition = state.filters.condition.trim().toLowerCase();
  const activeDelivery = state.filters.delivery.trim().toLowerCase();
  const minPrice = Number(state.filters.minPrice);
  const maxPrice = Number(state.filters.maxPrice);

  return state.products.filter((product) => {
    const searchableText = [
      product.title,
      product.description,
      product.location,
      product.category,
      product.condition,
      product.delivery,
      ...(product.brands || []),
      ...(product.hashtags || []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchableText.includes(query);
    const matchesCategory = !activeCategory || product.category.toLowerCase() === activeCategory;
    const matchesLocation = !activeLocation || product.location.toLowerCase() === activeLocation;
    const matchesCondition = !activeCondition || product.condition.toLowerCase() === activeCondition;
    const matchesDelivery = !activeDelivery || product.delivery.toLowerCase() === activeDelivery;
    const matchesMinPrice = !state.filters.minPrice || product.price >= minPrice;
    const matchesMaxPrice = !state.filters.maxPrice || product.price <= maxPrice;
    return (
      matchesQuery &&
      matchesCategory &&
      matchesLocation &&
      matchesCondition &&
      matchesDelivery &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
}

function getSelectedProduct() {
  return state.products.find((item) => item.id === state.selectedProductId) || state.products[0];
}

function updateOfferStatus(productId, offerId, status, buttonEl) {
  const product = state.products.find((item) => item.id === productId);
  if (!product || !state.currentUser?.profileId || product.sellerProfileId !== state.currentUser.profileId) {
    alert("Only the product owner can accept or reject offers.");
    return;
  }

  void (async () => {
    if (buttonEl) setButtonLoading(buttonEl, true, status === "accepted" ? "Accepting…" : "Rejecting…");
    const { error } = await supabaseClient.from("product_offers").update({ status }).eq("id", offerId);
    if (error) {
      alert(error.message);
      if (buttonEl) setButtonLoading(buttonEl, false, status === "accepted" ? "Accept" : "Reject");
      return;
    }
    await loadDataFromSupabase();
    render();
    const msg = status === "accepted"
      ? "✅ Offer accepted! The buyer has been notified."
      : "❌ Offer rejected.";
    showFeedback(elements.detailFeedback, msg, status === "accepted" ? "success" : "error");
  })();
}

function likeComment(productId, commentId) {
  const product = state.products.find((item) => item.id === productId);
  const comment = product?.comments.find((item) => item.id === commentId);
  if (!comment || !state.currentUser?.profileId) {
    return;
  }

  void (async () => {
    const { error: likeError } = await supabaseClient.from("comment_likes").insert({
      comment_id: commentId,
      profile_id: state.currentUser.profileId,
    });

    if (likeError) {
      if (!String(likeError.message).toLowerCase().includes("duplicate")) {
        alert(likeError.message);
      }
      return;
    }

    const { error: updateError } = await supabaseClient
      .from("product_comments")
      .update({ like_count: (comment.likes || 0) + 1 })
      .eq("id", commentId);

    if (updateError) {
      alert(updateError.message);
      return;
    }

    await loadDataFromSupabase();
    renderDetail();
  })();
}

function getConversationsForCurrentUser() {
  if (!state.currentUser?.profileId) {
    return [];
  }

  const conversations = [];
  state.products.forEach((product) => {
    (product.rawConversations || []).forEach((conversation) => {
      if (
        conversation.seller_profile_id !== state.currentUser.profileId &&
        conversation.buyer_profile_id !== state.currentUser.profileId
      ) {
        return;
      }

      const isSeller = conversation.seller_profile_id === state.currentUser.profileId;
      const otherUser = isSeller ? conversation.buyerName || "Buyer" : conversation.sellerName || product.sellerName;
      const messages = (product.messages || []).filter((message) => message.conversationId === conversation.id);
      const lastMessage = messages[messages.length - 1];

      conversations.push({
        id: conversation.id,
        product,
        otherUser,
        buyerProfileId: conversation.buyer_profile_id,
        sellerProfileId: conversation.seller_profile_id,
        messages,
        lastMessageAt: lastMessage?.createdAtRaw || conversation.created_at || "",
      });
    });
  });

  return conversations.sort((left, right) => {
    return new Date(right.lastMessageAt).getTime() - new Date(left.lastMessageAt).getTime();
  });
}

function getActiveConversation() {
  return getConversationsForCurrentUser().find(
    (conversation) => String(conversation.id) === String(state.activeConversationKey)
  );
}

async function markConversationAsRead(conversationId) {
  if (!state.currentUser?.profileId) {
    return;
  }

  let hasUnread = false;
  state.products.forEach((product) => {
    (product.messages || []).forEach((message) => {
      if (message.conversationId === conversationId && message.recipientProfileId === state.currentUser.profileId && !message.isRead) {
        message.isRead = true;
        hasUnread = true;
      }
    });
  });

  (state.notifications || []).forEach((notification) => {
    if (
      notification.related_conversation_id === conversationId &&
      notification.profile_id === state.currentUser.profileId &&
      !notification.is_read
    ) {
      notification.is_read = true;
    }
  });

  if (!hasUnread) {
    return;
  }

  await supabaseClient
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .eq("recipient_profile_id", state.currentUser.profileId)
    .eq("is_read", false);

  await supabaseClient
    .from("notifications")
    .update({ is_read: true })
    .eq("profile_id", state.currentUser.profileId)
    .eq("related_conversation_id", conversationId)
    .eq("is_read", false);
}

async function markProductNotificationsAsRead(productId) {
  if (!state.currentUser?.profileId) {
    return;
  }

  let hasUnread = false;
  (state.notifications || []).forEach((notification) => {
    if (
      notification.related_product_id === productId &&
      notification.profile_id === state.currentUser.profileId &&
      !notification.is_read
    ) {
      notification.is_read = true;
      hasUnread = true;
    }
  });

  if (!hasUnread) {
    return;
  }

  await supabaseClient
    .from("notifications")
    .update({ is_read: true })
    .eq("profile_id", state.currentUser.profileId)
    .eq("related_product_id", productId)
    .eq("is_read", false);
}

function getPreferredBuyerForSeller(product) {
  const buyers = Array.from(
    new Set(
      (product.messages || [])
        .map((message) => message.sender)
        .filter((name) => name && name !== product.sellerName)
    )
  );

  if (buyers.length) {
    return buyers[0];
  }

  return product.offers[0]?.buyer || null;
}

function getNotificationsCount() {
  if (!state.currentUser?.profileId) {
    return 0;
  }
  return (state.notifications || []).filter((item) => !item.is_read).length;
}

function getDetailMessageLabel(product) {
  if (!state.currentUser?.profileId) {
    return "Message seller";
  }
  if (state.currentUser.profileId === product.sellerProfileId) {
    return "Open buyer chat";
  }
  return "Message seller";
}

function getAllBrands() {
  return uniqueSorted(state.products.flatMap((product) => product.brands || []));
}
function getAllCategories() {
  return uniqueSorted(state.products.map((product) => product.category));
}
function getAllLocations() {
  return uniqueSorted(state.products.map((product) => product.location));
}
function getAllConditions() {
  return uniqueSorted(state.products.map((product) => product.condition));
}
function getAllDeliveryTypes() {
  return uniqueSorted(state.products.map((product) => product.delivery));
}

function uniqueSorted(values) {
  return Array.from(new Set(values.map((value) => value?.trim()).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function buildBrands(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildHashtags(value, description) {
  const manualTags = value
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map(normalizeHashtag);
  const extractedFromDescription = (description.match(/#([a-zA-Z0-9_]+)/g) || []).map(normalizeHashtag);
  return Array.from(new Set([...manualTags, ...extractedFromDescription])).filter(Boolean);
}

function normalizeHashtag(value) {
  const cleaned = value.replace(/[^#a-zA-Z0-9_]/g, "");
  if (!cleaned) return "";
  return cleaned.startsWith("#") ? cleaned.toLowerCase() : `#${cleaned.toLowerCase()}`;
}

function resetImagePreview() {
  state.draftImages = [];
  if (elements.imagePreviewGrid) elements.imagePreviewGrid.innerHTML = "";
  if (elements.productImageInput) elements.productImageInput.value = "";
  if (elements.imageFileName) elements.imageFileName.textContent = "No photos selected yet.";
}

function resetProductEditor() {
  elements.productFormTitle.textContent = "Add a product";
  elements.productSubmitButton.textContent = "Publish product";
  elements.productSubmitButton.dataset.defaultLabel = "Publish product";
}

function safeReset(form) {
  if (form && typeof form.reset === "function") {
    form.reset();
  }
}

function setChatSubmitDisabled(disabled) {
  const submitButton = elements.chatForm?.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = disabled;
  }
}

function setButtonLoading(button, loading, label) {
  if (!button) {
    return;
  }

  if (!button.dataset.defaultLabel) {
    button.dataset.defaultLabel = button.textContent || "";
  }

  button.disabled = loading;
  button.classList.toggle("button-loading", loading);
  button.textContent = loading ? label : button.dataset.defaultLabel || label;
}

function setAuthMode(mode) {
  state.authMode = mode;
  if (mode !== "signIn") {
    state.isPasswordRecovery = false;
  }
  saveState();
  showFeedback(elements.authFeedback, "", "info");
  showFeedback(elements.passwordRecoveryFeedback, "", "info");
  renderAuthMode();
}

function renderAuthMode() {
  const isSignUp = state.authMode === "signUp";
  elements.signInModeButton.classList.toggle("active", !isSignUp);
  elements.signUpModeButton.classList.toggle("active", isSignUp);
  elements.authCardTitle.textContent = isSignUp ? "Create account" : "Sign in";
  elements.authSubmitButton.textContent = isSignUp ? "Create account" : "Sign in";
  elements.authSubmitButton.dataset.defaultLabel = isSignUp ? "Create account" : "Sign in";
  elements.forgotPasswordButton.hidden = isSignUp;
  elements.authHelperText.textContent = isSignUp
    ? "Create your Soukly account to start buying and selling in the UAE."
    : "Sign in to publish products, save favourites, make offers, and chat.";
  elements.passwordRecoveryForm.hidden = !state.isPasswordRecovery;
}

function getEditingProduct() {
  return state.products.find((product) => product.id === state.editingProductId) || null;
}

function startEditingProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) {
    return;
  }

  state.editingProductId = product.id;
  state.draftImages = [...(product.images || [product.image].filter(Boolean))];

  elements.productForm.querySelector('[name="title"]').value = product.title;
  elements.productForm.querySelector('[name="category"]').value = product.category;
  elements.productForm.querySelector('[name="price"]').value = String(product.price);
  elements.productForm.querySelector('[name="condition"]').value = product.condition;
  elements.productForm.querySelector('[name="delivery"]').value = product.delivery;
  elements.productForm.querySelector('[name="location"]').value = product.location;
  elements.productForm.querySelector('[name="manualBrand"]').value = (product.brands || []).join(", ");
  elements.productForm.querySelector('[name="hashtags"]').value = (product.hashtags || []).join(" ");
  elements.productForm.querySelector('[name="description"]').value = product.description;

  if (state.draftImages.length) {
    renderImagePreviewGrid();
    elements.imageFileName.textContent = `${state.draftImages.length} photo(s) loaded.`;
  } else {
    resetImagePreview();
  }

  elements.productFormTitle.textContent = "Edit product";
  elements.productSubmitButton.textContent = "Save changes";
  elements.productSubmitButton.dataset.defaultLabel = "Save changes";
  refreshValidationIndicators(elements.productForm);
  showFeedback(elements.productFeedback, "Edit the fields below and save your changes.", "info");
  activateView("sell");
}

function editSelectedProduct() {
  const product = getSelectedProduct();
  if (!product) {
    return;
  }
  startEditingProduct(product.id);
}

function deleteSelectedProduct() {
  const product = getSelectedProduct();
  if (!product || !state.currentUser?.profileId || product.sellerProfileId !== state.currentUser.profileId) {
    return;
  }

  if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) {
    return;
  }

  void (async () => {
    try {
      const { error } = await supabaseClient.from("products").delete().eq("id", product.id);
      if (error) {
        showFeedback(elements.productFeedback, error.message, "error");
        return;
      }

      state.selectedProductId = null;
      state.editingProductId = null;
      await loadDataFromSupabase();
      render();
      activateView("profile");
      showFeedback(elements.productFeedback, "Product deleted successfully.", "success");
    } catch (error) {
      showFeedback(elements.productFeedback, error.message || "Could not delete the product.", "error");
    }
  })();
}

function showFeedback(element, message, tone = "info") {
  if (!element) {
    return;
  }

  if (!message) {
    element.hidden = true;
    element.textContent = "";
    element.className = "form-feedback";
    return;
  }

  element.hidden = false;
  element.textContent = message;
  element.className = `form-feedback is-${tone}`;
}

function bindValidationIndicators(form) {
  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => updateFieldValidity(field));
    field.addEventListener("change", () => updateFieldValidity(field));
    updateFieldValidity(field);
  });
}

function refreshValidationIndicators(form) {
  form.querySelectorAll("input, select, textarea").forEach((field) => updateFieldValidity(field));
}

function updateFieldValidity(field) {
  const label = field.closest("label");
  if (!label) {
    return;
  }

  const hasValue =
    field.type === "file" ? Boolean(field.files?.length) : Boolean(String(field.value || "").trim());
  const isValid = field.required ? field.checkValidity() : hasValue;
  label.classList.toggle("field-valid", isValid);
}

function getEmailRedirectUrl() {
  if (window.location.protocol.startsWith("http")) {
    return window.location.href.split("#")[0];
  }

  return undefined;
}

function getAuthHashMessage() {
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
  if (!hash) {
    return "";
  }

  const params = new URLSearchParams(hash);
  const errorCode = params.get("error_code");
  const description = params.get("error_description");

  if (!errorCode && !description) {
    return "";
  }

  if (errorCode === "otp_expired") {
    return "The confirmation email link has expired. Request a fresh sign in or sign up again to get a new email.";
  }

  return description ? description.replaceAll("+", " ") : "Authentication could not be completed.";
}

function isRecoveryHash() {
  const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
  if (!hash) {
    return false;
  }
  const params = new URLSearchParams(hash);
  return params.get("type") === "recovery";
}

function bindHashtagClicks(container) {
  container.querySelectorAll("[data-hashtag]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const hashtag = button.getAttribute("data-hashtag") || "";
      state.filters.query = hashtag;
      saveState();
      render();
      activateView("home");
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
