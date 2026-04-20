import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { API_BASE } from "../../config";
import "./profile.css";

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Your Jobs", path: "/your-jobs" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
  
];

const DEFAULT_PROFILE = {
  university: "",
  program: "",
  bio: "",
  experience: [] as { emoji: string; label: string }[],
};

const UNIVERSITIES = [
  { name: "University at Buffalo", searchTerms: "buffalo ub suny" },
  { name: "Buffalo State University", searchTerms: "buffalo state" },
  { name: "Canisius College", searchTerms: "canisius" },
  { name: "SUNY Buffalo State", searchTerms: "suny buffalo" },
  { name: "Niagara University", searchTerms: "niagara" },
  { name: "SUNY Geneseo", searchTerms: "geneseo" },
  { name: "SUNY Binghamton", searchTerms: "binghamton" },
  { name: "SUNY Stony Brook", searchTerms: "stony brook" },
  { name: "Syracuse University", searchTerms: "syracuse" },
  { name: "Cornell University", searchTerms: "cornell" },
  { name: "RIT", searchTerms: "rit rochester institute" },
  { name: "University of Rochester", searchTerms: "rochester" },
];

const MAJORS = [
  { name: "Computer Science", searchTerms: "cs comp sci" },
  { name: "Computer Engineering", searchTerms: "ce comp eng" },
  { name: "Electrical Engineering", searchTerms: "ee electrical" },
  { name: "Mechanical Engineering", searchTerms: "me mechanical" },
  { name: "Business Administration", searchTerms: "business admin" },
  { name: "Biology", searchTerms: "bio" },
  { name: "Psychology", searchTerms: "psych" },
  { name: "Nursing", searchTerms: "nursing" },
  { name: "Economics", searchTerms: "econ" },
  { name: "Data Science", searchTerms: "data" },
  { name: "Information Technology", searchTerms: "it" },
  { name: "Mathematics", searchTerms: "math" },
];

function universityMatchesQuery(
  name: string,
  searchTerms: string,
  filter: string,
): boolean {
  const q = filter.trim().toLowerCase();
  if (!q) return true;
  return (
    name.toLowerCase().includes(q) || searchTerms.toLowerCase().includes(q)
  );
}

function majorMatchesQuery(
  name: string,
  searchTerms: string,
  filter: string,
): boolean {
  const q = filter.trim().toLowerCase();
  if (!q) return true;
  return (
    name.toLowerCase().includes(q) || searchTerms.toLowerCase().includes(q)
  );
}

const AvatarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" fill="#c4c4c4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#c4c4c4" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 11v6M14 11v6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

type ProfileUser = {
  id?: number;
  username?: string;
  email?: string;
  university?: string;
  program?: string;
  major_id?: string | number | null;
  bio?: string;
  experience?: { emoji: string; label: string }[];
  profilePhoto?: string;
};

type MajorOption = { id: string; field: string };

const PLACEHOLDER_REVIEWS = [
  { rating: 5, service: "Software Engineer", text: "Great to work with!", author: "@user1" },
  { rating: 5, service: "Data Scientist", text: "Super helpful and reliable.", author: "@user2" },
];

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileUser | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<{ rating: number; service: string; review_text: string; reviewer_name: string }[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const [editUsername, setEditUsername] = useState("");
  const [editUniversity, setEditUniversity] = useState("");
  const [editProgram, setEditProgram] = useState("");
  const [editMajorId, setEditMajorId] = useState<string>("");
  const [editBio, setEditBio] = useState("");
  const [editExperience, setEditExperience] = useState<
    { emoji: string; label: string }[]
  >([]);

  const [majors, setMajors] = useState<MajorOption[]>([]);
  const [universityFilter, setUniversityFilter] = useState("");
  const [universityDropdownOpen, setUniversityDropdownOpen] = useState(false);
  const [programFilter, setProgramFilter] = useState("");
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const universityDropdownRef = useRef<HTMLDivElement>(null);
  const programDropdownRef = useRef<HTMLDivElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const [pendingPhotoFile, setPendingPhotoFile] = useState<File | null>(null);
  const [pendingPhotoPreview, setPendingPhotoPreview] = useState<string | null>(
    null,
  );
  const [pendingPhotoRemove, setPendingPhotoRemove] = useState(false);

  const isMe = !userId || userId === "me";

  const fetchProfile = async () => {
    try {
      // Use get_user.php for both own and others' profiles (previous working behavior)
      const profileId = isMe
        ? localStorage.getItem("userId") || localStorage.getItem("user_id")
        : userId;
      const endpoint = `${API_BASE}/get_user.php?id=${profileId}`;

      const res = await fetch(endpoint, { credentials: "include" });
      const data = await res.json();

      if (data.user) {
        setProfile(data.user);

        // Only sync edit state when not in edit mode so we don't overwrite user's unsaved typing
        if (isMe && !editMode) {
          setEditUsername(data.user.username || "");
          setEditUniversity(data.user.university || "");
          setEditProgram(data.user.program || "");
          setEditMajorId(
            data.user.major_id != null ? String(data.user.major_id) : "",
          );
          setEditBio(data.user.bio || "");
          setEditExperience(data.user.experience || []);
        }
      } else {
        setProfile({
          username: "User not found",
          isGuest: true,
        } as ProfileUser);
      }
    } catch (err) {
      console.error("Profile fetch failed", err);
      setProfile({ username: "Error loading profile" } as ProfileUser);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId, isMe]); // Refetch when the URL ID changes

  useEffect(() => {
    fetch(`${API_BASE}/GetMajors.php`)
      .then((res) => res.json())
      .then((data: MajorOption[]) => setMajors(Array.isArray(data) ? data : []))
      .catch(() => setMajors([]));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        universityDropdownRef.current &&
        !universityDropdownRef.current.contains(e.target as Node)
      ) {
        setUniversityDropdownOpen(false);
      }
      if (
        programDropdownRef.current &&
        !programDropdownRef.current.contains(e.target as Node)
      ) {
        setProgramDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
  const profileId = isMe
    ? localStorage.getItem("userId") || localStorage.getItem("user_id")
    : userId;

  if (!profileId) return;

  fetch(`${API_BASE}/get_reviews.php?user_id=${profileId}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setReviews(data.reviews);
        setAverageRating(data.average_rating);
        setTotalReviews(data.total_reviews);
      }
    })
    .catch((err) => console.error("Failed to fetch reviews", err));
}, [userId, isMe]);

  const handleSidebarLink = (path: string) => {
    setSidebarOpen(false);
    if (location.pathname === path) return;
    navigate(path);
  };

  const startEdit = () => {
    const u = profile ?? {};
    const def = DEFAULT_PROFILE;
    setEditUsername(u.username ?? "");
    setEditUniversity(u.university ?? def.university);
    setEditProgram(u.program ?? def.program);
    setEditMajorId(u.major_id != null ? String(u.major_id) : "");
    setEditBio(u.bio ?? def.bio);
    setEditExperience(
      Array.isArray(u.experience) && u.experience.length > 0
        ? u.experience.map((e) => ({
            emoji: e.emoji ?? "",
            label: e.label ?? "",
          }))
        : [{ emoji: "✓", label: "" }],
    );
    setSaveError(null);
    setPendingPhotoFile(null);
    setPendingPhotoPreview(null);
    setPendingPhotoRemove(false);
    setEditMode(true);
  };

  const cancelEdit = () => {
    if (pendingPhotoPreview) URL.revokeObjectURL(pendingPhotoPreview);
    setPendingPhotoFile(null);
    setPendingPhotoPreview(null);
    setPendingPhotoRemove(false);
    setEditMode(false);
    setSaveError(null);
  };

  const handleSave = async () => {
    // Read from input DOM at click time so we never send stale state
    const username = (usernameInputRef.current?.value ?? editUsername).trim();
    if (!username) {
      setSaveError("Username is required.");
      return;
    }
    setSaveError(null);
    try {
      // Apply photo change only on Save: remove or upload
      if (pendingPhotoRemove) {
        const res = await fetch(`${API_BASE}/remove_profile_photo.php`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) {
          setSaveError(data.message || "Failed to remove photo.");
          return;
        }
        setProfile((p) => (p ? { ...p, profilePhoto: undefined } : p));
      } else if (pendingPhotoFile) {
        const fd = new FormData();
        fd.append("photo", pendingPhotoFile);
        const res = await fetch(`${API_BASE}/upload_profile_photo.php`, {
          method: "POST",
          credentials: "include",
          body: fd,
        });
        const data = await res.json();
        if (!data.success || !data.profilePhoto) {
          setSaveError(data.message || "Photo upload failed.");
          return;
        }
        setProfile((p) => (p ? { ...p, profilePhoto: data.profilePhoto } : p));
      }

      if (pendingPhotoPreview) URL.revokeObjectURL(pendingPhotoPreview);
      setPendingPhotoFile(null);
      setPendingPhotoPreview(null);
      setPendingPhotoRemove(false);

      const payload = {
        username,
        university: editUniversity.trim(),
        major_id: editMajorId || null,
        bio: editBio.trim(),
        experience: editExperience.filter(
          (e) => e.emoji.trim() !== "" || e.label.trim() !== "",
        ),
      };
      const res = await fetch(`${API_BASE}/update_profile.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.user) {
        setProfile(data.user);
        setEditMode(false);
        await fetchProfile();
        if (data.profileColumnsMissing) {
          alert(
            "Profile saved, but some fields could not be saved. Ensure api/schema_profile.sql has been run on your database.",
          );
        }
      } else {
        setSaveError(data.message || "Save failed.");
      }
    } catch (err) {
      setSaveError("Network error. Please try again.");
    }
  };

  const updateExperience = (
    index: number,
    field: "emoji" | "label",
    value: string,
  ) => {
    const next = [...editExperience];
    if (!next[index]) return;
    next[index] = { ...next[index], [field]: value };
    setEditExperience(next);
  };

  const addExperienceRow = () => {
    setEditExperience([...editExperience, { emoji: "✓", label: "" }]);
  };

  const removeExperienceRow = (index: number) => {
    setEditExperience(editExperience.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (pendingPhotoPreview) URL.revokeObjectURL(pendingPhotoPreview);
    const preview = URL.createObjectURL(file);
    setPendingPhotoPreview(preview);
    setPendingPhotoFile(file);
    setPendingPhotoRemove(false);
    e.target.value = "";
  };

  const handleRemovePhoto = () => {
    if (pendingPhotoPreview) URL.revokeObjectURL(pendingPhotoPreview);
    setPendingPhotoPreview(null);
    setPendingPhotoFile(null);
    setPendingPhotoRemove(true);
  };

  const displayProfile = {
    ...DEFAULT_PROFILE,
    ...profile,
    experience:
      Array.isArray(profile?.experience) && profile!.experience!.length > 0
        ? profile!.experience!
        : DEFAULT_PROFILE.experience.length > 0
          ? DEFAULT_PROFILE.experience
          : [
              { emoji: "📚", label: "Tutoring sessions" },
              { emoji: "🚗", label: "Rides given" },
              { emoji: "🚛", label: "Moving help" },
            ],
  };

  const avatarUrl =
    profile?.profilePhoto &&
    `${API_BASE}/get_profile_photo.php?f=${encodeURIComponent(profile.profilePhoto)}`;
  const displayAvatarUrl =
    editMode && pendingPhotoPreview
      ? pendingPhotoPreview
      : editMode && pendingPhotoRemove
        ? undefined
        : avatarUrl;

  const renderStars = (count: number) =>
    "⭐".repeat(Math.min(5, Math.round(count)));

  if (!profile) {
    return (
      <div className="profile-page">
        <div className="profile-body">
          <p className="profile-name">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`sidebar-drawer${sidebarOpen ? " open" : ""}`}
        aria-label="Navigation menu"
      >
        <nav className="sidebar-nav">
          {SIDEBAR_LINKS.map((link) => (
            <button
              key={link.path}
              className={`sidebar-link${location.pathname === link.path ? " active" : ""}`}
              onClick={() => handleSidebarLink(link.path)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="profile-hero">
        <button
          className="profile-menu-btn"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {displayAvatarUrl ? (
              <img
                src={displayAvatarUrl}
                alt=""
                className="profile-avatar-img"
              />
            ) : (
              <AvatarIcon />
            )}
          </div>
        </div>

        {isMe && !editMode && (
          <button className="profile-edit-btn" onClick={startEdit}>
            <EditIcon />
            Edit
          </button>
        )}
      </div>

      <div className="profile-body">
        {!editMode ? (
          <>
            <h1 className="profile-name">{profile.username ?? "—"}</h1>

            <div className="profile-info-card">
              <div className="profile-info-item">
                <span className="profile-info-label">University</span>
                <span className="profile-info-value">{displayProfile.university || "—"}</span>
                </div>
                <div className="profile-info-divider" />
                <div className="profile-info-item">
                  <span className="profile-info-label">Program</span>
                  <span className="profile-info-value">{displayProfile.program || "—"}</span>
                  </div>
                  <div className="profile-info-divider" />
                  <div className="profile-info-item">
                    <span className="profile-info-label">Member since</span>
                    <span className="profile-info-value">—</span>
                    </div>
                    <div className="profile-info-divider" />
                    <div className="profile-info-item">
                      <span className="profile-info-label">Rating</span>
                      <div className="profile-rating-row">
                        <span className="profile-stars">
                          {averageRating ? renderStars(averageRating) : "No ratings yet"}
                          </span>
                          <span className="profile-rating-num">
                            {averageRating ? `(${averageRating} / 5)` : ""}
                            </span>
                            </div>
                            </div>
                            <div className="profile-info-divider" />
                            <div className="profile-info-item">
                              <span className="profile-info-label">Jobs done</span>
                              <span className="profile-stat-pill">—</span>
                              </div>
                              </div>   



            
            

            <div className="profile-cols">
              <div className="profile-section-card">
                <h2 className="profile-section-title">Bio</h2>
                <p className="profile-bio-text">
                  {displayProfile.bio || "No bio yet."}
                </p>
              </div>
              <div className="profile-section-card">
                <h2 className="profile-section-title">Experience</h2>
                <ul className="profile-exp-list">
                  {displayProfile.experience.map((item, i) => (
                    <li key={i} className="profile-exp-item">
                      <span className="profile-exp-check">
                        <CheckIcon />
                      </span>
                      {item.emoji} {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="profile-reviews-card">
              <h2 className="profile-reviews-title">
                 Reviews {totalReviews > 0 && `(${totalReviews})`}
                 </h2>
                 <div className="profile-reviews-list">
                  {reviews.length === 0 ? (
                    <p style={{ fontFamily: "Inter", fontSize: 14, color: "#9ca3af", textAlign: "center" }}>
                       No reviews yet.
                        </p>
                        ) : (
                          reviews.map((r, i) => (
                          <div key={i} className="profile-review-item">
                           
                           <p className="profile-review-title">{r.service}</p>
                            <div style={{flexDirection: "row",display: "flex", alignItems: "baseline", gap: "8px"}} >
                              <p className="profile-review-text">"{r.review_text}"</p>
                              <p className="profile-review-footer">— @{r.reviewer_name}</p>

                              </div>
                              
                            
                            <span className="profile-review-footer">
                              
                              {renderStars (r.rating)} {r.rating}.0 </span>

                              
                              </div>
                              )) )}
                              </div>
                              </div>

         
          </>
        ) : (
          <>
            <div className="profile-edit-form">
              <input
                ref={usernameInputRef}
                type="text"
                className="profile-edit-input profile-edit-username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="Username (required)"
              />

              <div className="profile-edit-field" ref={universityDropdownRef}>
                <label className="profile-edit-label">University</label>
                <input
                  type="text"
                  className="profile-edit-input profile-edit-dropdown-input"
                  value={
                    universityDropdownOpen ? universityFilter : editUniversity
                  }
                  onFocus={() => {
                    setUniversityDropdownOpen(true);
                    setUniversityFilter(editUniversity);
                  }}
                  onChange={(e) => setUniversityFilter(e.target.value)}
                  placeholder="Search or type university"
                />
                {universityDropdownOpen && (
                  <div className="profile-dropdown-list">
                    {UNIVERSITIES.filter((u) =>
                      universityMatchesQuery(
                        u.name,
                        u.searchTerms,
                        universityFilter,
                      ),
                    ).map((u) => (
                      <button
                        key={u.name}
                        type="button"
                        className="profile-dropdown-option"
                        onClick={() => {
                          setEditUniversity(u.name);
                          setUniversityFilter("");
                          setUniversityDropdownOpen(false);
                        }}
                      >
                        {u.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="profile-edit-field" ref={programDropdownRef}>
                <label className="profile-edit-label">Program / Major</label>
                <input
                  type="text"
                  className="profile-edit-input profile-edit-dropdown-input"
                  value={
                    programDropdownOpen
                      ? programFilter
                      : editMajorId
                        ? (majors.find((m) => String(m.id) === editMajorId)
                            ?.field ?? editProgram)
                        : editProgram
                  }
                  onFocus={() => {
                    setProgramDropdownOpen(true);
                    setProgramFilter(
                      editMajorId
                        ? (majors.find((m) => String(m.id) === editMajorId)
                            ?.field ?? editProgram)
                        : editProgram,
                    );
                  }}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  placeholder="Search or select major"
                />
                {programDropdownOpen && (
                  <div className="profile-dropdown-list">
                    {majors
                      .filter((m) =>
                        m.field
                          .toLowerCase()
                          .includes(programFilter.trim().toLowerCase()),
                      )
                      .map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          className="profile-dropdown-option"
                          onClick={() => {
                            setEditMajorId(String(m.id));
                            setEditProgram(m.field);
                            setProgramFilter("");
                            setProgramDropdownOpen(false);
                          }}
                        >
                          {m.field}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              <div className="profile-edit-field">
                <label className="profile-edit-label">Bio</label>
                <textarea
                  className="profile-edit-textarea"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell others about yourself"
                  rows={4}
                />
              </div>

              <div className="profile-edit-field">
                <label className="profile-edit-label">Experience</label>
                {editExperience.map((row, i) => (
                  <div key={i} className="profile-exp-edit-row">
                    <input
                      type="text"
                      className="profile-exp-edit-emoji"
                      value={row.emoji}
                      onChange={(e) =>
                        updateExperience(i, "emoji", e.target.value)
                      }
                      placeholder="✓"
                    />
                    <input
                      type="text"
                      className="profile-exp-edit-label"
                      value={row.label}
                      onChange={(e) =>
                        updateExperience(i, "label", e.target.value)
                      }
                      placeholder="e.g. Tutoring sessions completed"
                    />
                    <button
                      type="button"
                      className="profile-exp-remove-btn"
                      onClick={() => removeExperienceRow(i)}
                      aria-label="Remove row"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="profile-exp-add-btn"
                  onClick={addExperienceRow}
                >
                  + Add row
                </button>
              </div>

              <div className="profile-edit-field">
                <label className="profile-edit-label">Photo</label>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="profile-photo-hidden"
                  onChange={handlePhotoChange}
                />
                <div className="profile-photo-actions">
                  <button
                    type="button"
                    className="profile-btn-secondary"
                    onClick={() => photoInputRef.current?.click()}
                  >
                    Change photo
                  </button>
                  {(profile.profilePhoto || pendingPhotoFile) &&
                    !pendingPhotoRemove && (
                      <button
                        type="button"
                        className="profile-btn-remove-photo"
                        onClick={handleRemovePhoto}
                        aria-label="Remove photo"
                      >
                        <TrashIcon />
                      </button>
                    )}
                </div>
              </div>

              {saveError && (
                <p className="profile-save-error" role="alert">
                  {saveError}
                </p>
              )}

              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-btn-cancel"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="profile-btn-save"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
