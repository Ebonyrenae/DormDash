import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "../../config";
import schoolData from "../../schools.json";

const SIDEBAR_LINKS = [
  { label: "Home", path: "/dashboard" },
  { label: "View Jobs", path: "/all-jobs" },
  { label: "Post a Job", path: "/post-job" },
  { label: "Your Jobs", path: "/your-jobs" },
  { label: "Profile", path: "/profile" },
  { label: "Messages", path: "/messages" },
  { label: "Settings", path: "/settings" },
  
];

const API_BASE_URL = API_BASE;
const ME_API_URL = `${API_BASE}/me.php`;
const LOGOUT_API_URL = `${API_BASE}/logout.php`;
const AUTH_STORAGE_KEYS = [
  "isLoggedIn",
  "userId",
  "user_id",
  "username",
] as const;

// SVG Icon Components
const UserIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const BuildingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const BellIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const HelpCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const LogOutIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const SaveIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const SmartphoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

const MessageSquareIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const GraduationCapIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const PartyPopperIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.8 11.3 2 22l10.7-3.79"></path>
    <path d="M4 3h.01"></path>
    <path d="M22 8h.01"></path>
    <path d="M15 2h.01"></path>
    <path d="M22 20h.01"></path>
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
  </svg>
);

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a18.16 18.16 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <path d="M4.42 4.42A15.1 15.1 0 0 0 1 12s4 8 11 8a10.43 10.43 0 0 0 5.08-1.27"></path>
  </svg>
);

const DatabaseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const KeyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7.5" cy="15.5" r="5.5"></circle>
    <path d="m21 2-9.6 9.6"></path>
    <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

type NotificationsSettings = {
  email: boolean;
  push: boolean;
  sms: boolean;
  deadlines: boolean;
  grades: boolean;
  events: boolean;
};

type PrivacySettings = {
  profileVisible: boolean;
  showEmail: boolean;
  showPhone: boolean;
  dataSharing: boolean;
};

// User type
type User = {
  id: number;
  username?: string;
  email?: string;
};

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("main");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<NotificationsSettings>({
      email: true,
      push: true,
      sms: false,
      deadlines: true,
      grades: true,
      events: false,
    });
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    dataSharing: true,
  });

  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showSuccessMessage = (message: string): void => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const showErrorMessage = (message: string): void => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  // Load user settings on component mount
  // Load current user and their settings on component mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Fetch the currently logged-in user (me.php first; fallback to get_user with localStorage userId)
  const fetchCurrentUser = async () => {
    try {
      const res = await fetch(ME_API_URL, {
        credentials: "include",
      });
      const data = await res.json();

      if (data.loggedIn && data.user) {
        setUser(data.user);
        setUserId(data.user.id);
        fetchUserSettings(data.user.id);
        fetch(`${API_BASE_URL}/get_user.php?id=${data.user.id}`, {
          credentials: "include",
        })
          .then((r) => r.json())
          .then((d) => {
            if (d.success && d.user)
              setProfilePhoto(
                d.user.profile_photo ?? d.user.profilePhoto ?? null,
              );
          })
          .catch(() => {});
        setIsLoading(false);
        return;
      }

      const storedId =
        localStorage.getItem("userId") || localStorage.getItem("user_id");
      if (storedId) {
        const userRes = await fetch(
          `${API_BASE_URL}/get_user.php?id=${storedId}`,
          {
            credentials: "include",
          },
        );
        const userData = await userRes.json();
        if (userData.success && userData.user && userData.user.id) {
          const u = userData.user;
          setUser({
            id: u.id,
            username: u.username ?? "",
            email: u.email ?? "",
          });
          setUserId(u.id);
          setProfilePhoto(u.profile_photo ?? u.profilePhoto ?? null);
          fetchUserSettings(u.id);
          setIsLoading(false);
          return;
        }
      }

      navigate("/signin");
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      const storedId =
        localStorage.getItem("userId") || localStorage.getItem("user_id");
      if (storedId) {
        try {
          const userRes = await fetch(
            `${API_BASE_URL}/get_user.php?id=${storedId}`,
            {
              credentials: "include",
            },
          );
          const userData = await userRes.json();
          if (userData.success && userData.user && userData.user.id) {
            const u = userData.user;
            setUser({
              id: u.id,
              username: u.username ?? "",
              email: u.email ?? "",
            });
            setUserId(u.id);
            setProfilePhoto(u.profile_photo ?? u.profilePhoto ?? null);
            fetchUserSettings(u.id);
            setIsLoading(false);
            return;
          }
        } catch (_) {}
      }
      navigate("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  // API Functions
  // add this near your other state:
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);

  const fetchUserSettings = async (uid: number) => {
    setIsLoadingSettings(true);

    const toBool = (v: any) =>
      v === true || v === 1 || v === "1" || v === "true";

    try {
      const res = await fetch(
        `${API_BASE_URL}/get_user_settings.php?userId=${encodeURIComponent(uid)}`,
        { credentials: "include" },
      );

      const root = await res.json();

      // Accept multiple shapes:
      // { success:true, settings:{...} } OR { success:true, data:{...} } OR { ...direct fields... }
      const payload = root?.settings ?? root?.data ?? root ?? {};

      if (root?.success === false) {
        console.error("Failed to fetch user settings:", root);
        return;
      }

      // Basic fields
      setEmail(payload.email ?? "");
      setPhone(payload.phone ?? "");
      setUniversity(payload.university ?? "");

      // Nested settings
      const ns =
        payload.notificationSettings ??
        payload.notification_settings ??
        payload.notifications ??
        {};
      const ps =
        payload.privacySettings ??
        payload.privacy_settings ??
        payload.privacy ??
        {};

      // ✅ MUST match your NotificationsSettings type EXACTLY
      setNotificationsEnabled({
        email: toBool(
          ns.email ?? ns.email_notifications ?? ns.emailNotifications,
        ),
        push: toBool(ns.push ?? ns.push_notifications ?? ns.pushNotifications),
        sms: toBool(ns.sms ?? ns.sms_notifications ?? ns.smsNotifications),
        deadlines: toBool(
          ns.deadlines ??
            ns.deadline_notifications ??
            ns.deadlinesNotifications,
        ),
        grades: toBool(
          ns.grades ?? ns.grade_notifications ?? ns.gradesNotifications,
        ),
        events: toBool(
          ns.events ?? ns.event_notifications ?? ns.eventsNotifications,
        ),
      });

      // ✅ MUST match your PrivacySettings type EXACTLY
      setPrivacySettings({
        profileVisible: toBool(
          ps.profileVisible ?? ps.profile_visible ?? ps.profileVisibility,
        ),
        showEmail: toBool(ps.showEmail ?? ps.show_email),
        showPhone: toBool(ps.showPhone ?? ps.show_phone),
        dataSharing: toBool(ps.dataSharing ?? ps.data_sharing),
      });
    } catch (err) {
      console.error("Error fetching user settings:", err);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const updateEmail = async (newEmail: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update_email.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, email: newEmail }),
      });

      const result = await response.json();

      // ... rest of the code

      if (result.success) {
        setEmail(newEmail);
        showSuccessMessage("Email updated successfully!");
        return true;
      } else {
        if (
          typeof result.message === "string" &&
          result.message.toLowerCase().includes("already")
        ) {
          showErrorMessage("That email is already in use.");
        } else {
          showErrorMessage("Failed to update email: " + result.message);
        }
        return false;
      }
    } catch (error) {
      showErrorMessage("Failed to update email.");
      return false;
    }
  };

  const updatePhone = async (newPhone: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update_phone.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, phone: newPhone }),
      });

      const result = await response.json();

      if (result.success) {
        setPhone(newPhone);
        return true;
      } else {
        showErrorMessage("Failed to update phone: " + result.message);
        return false;
      }
    } catch (error) {
      showErrorMessage("Failed to update phone number.");
      return false;
    }
  };

  const updateUniversity = async (newUniversity: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update_university.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, university: newUniversity }),
      });

      const result = await response.json();

      if (result.success) {
        setUniversity(newUniversity);
        return true;
      } else {
        alert("Failed to update university: " + result.message);
        return false;
      }
    } catch (error) {
      console.error("Error updating university:", error);
      alert("Failed to update university");
      return false;
    }
  };

  const updateNotificationSettings = async (
    newSettings: NotificationsSettings,
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update_notifications.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, settings: newSettings }),
      });

      const result = await response.json();

      if (result.success) {
        setNotificationsEnabled(newSettings);
        return true;
      } else {
        alert("Failed to update notification settings: " + result.message);
        return false;
      }
    } catch (error) {
      console.error("Error updating notification settings:", error);
      return false;
    }
  };

  const updatePrivacySettings = async (newSettings: PrivacySettings) => {
    try {
      const response = await fetch(`${API_BASE_URL}/update_privacy.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, settings: newSettings }),
      });

      const result = await response.json();

      if (result.success) {
        setPrivacySettings(newSettings);
        return true;
      } else {
        alert("Failed to update privacy settings: " + result.message);
        return false;
      }
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_API_URL, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
      setUser(null);
      setUserId(null);
      setProfilePhoto(null);
      setCurrentPage("main");
      navigate("/signin");
    }
  };

  const goBack = () => setCurrentPage("main");

  // Email Page
  if (currentPage === "email") {
    return (
      <EmailPage
        email={email}
        updateEmail={updateEmail}
        goBack={goBack}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    );
  }

  // Phone Page
  if (currentPage === "phone") {
    return (
      <PhonePage
        phone={phone}
        updatePhone={updatePhone}
        goBack={goBack}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    );
  }

  // University Page
  if (currentPage === "university") {
    return (
      <UniversityPage
        university={university}
        updateUniversity={updateUniversity}
        goBack={goBack}
      />
    );
  }

  // Notifications Page
  if (currentPage === "notifications") {
    return (
      <NotificationsPage
        settings={notificationsEnabled}
        updateSettings={updateNotificationSettings}
        goBack={goBack}
      />
    );
  }

  // Privacy Page
  if (currentPage === "privacy") {
    return (
      <PrivacyPage
        settings={privacySettings}
        updateSettings={updatePrivacySettings}
        goBack={goBack}
        setCurrentPage={setCurrentPage}
      />
    );
  }
  if (currentPage === "password") {
    // Ensure we have a valid userId before rendering the password page
    if (!userId) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F9FAFB",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "4px solid #E5E7EB",
                borderTop: "4px solid #16A34A",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            ></div>
            <p style={{ color: "#6B7280" }}>Loading...</p>
          </div>
        </div>
      );
    }

    return <PasswordPage goBack={goBack} userId={userId} />;
  }

  // Help Page
  if (currentPage === "help") {
    return <HelpCenterPage goBack={goBack} />;
  }

  // Show loading while fetching user
  // Show loading while fetching user
  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  // If done loading but no userId, show error + redirect
  if (!userId) {
    return (
      <div style={{ padding: 24 }}>
        <p>Not logged in. Redirecting…</p>
      </div>
    );
  }

  // Main Settings Page
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Desktop Sidebar */}
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${isSidebarOpen ? " open" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`sidebar-drawer${isSidebarOpen ? " open" : ""}`}
        aria-label="Navigation menu"
      >
        <nav className="sidebar-nav">
          {SIDEBAR_LINKS.map((link) => (
            <button
              key={link.path}
              className={`sidebar-link${location.pathname === link.path ? " active" : ""}`}
              onClick={() => {
                setIsSidebarOpen(false);
                if (location.pathname !== link.path) navigate(link.path);
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: 0 }}>
        {/* Success/Error Messages */}
        {successMessage && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#10B981",
              color: "white",
              padding: "16px 24px",
              borderRadius: "8px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <CheckIcon />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#EF4444",
              color: "white",
              padding: "16px 24px",
              borderRadius: "8px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
            }}
          >
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Mobile Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            height: "64px",
            backgroundColor: "white",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            zIndex: 30,
          }}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#F3F4F6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <MenuIcon />
          </button>
          <h1
            style={{
              marginLeft: "12px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              margin: 0,
            }}
          >
            Settings
          </h1>
        </header>
        <div
          style={{
            maxWidth: "896px",
            margin: "0 auto",
            padding: "32px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* Back to Homepage Button */}
          <div style={{ marginBottom: "-16px" }}>
            <button
              onClick={() => navigate("/dashboard")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                backgroundColor: "white",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "500",
                color: "#374151",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
                e.currentTarget.style.borderColor = "#16A34A";
                e.currentTarget.style.color = "#16A34A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.color = "#374151";
              }}
            >
              <ArrowLeftIcon />
              <span>Back to Homepage</span>
            </button>
          </div>
          {/* Profile Card - photo/initials like dashboard; click goes to profile */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              padding: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate("/profile")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate("/profile");
                  }
                }}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #4ADE80 0%, #16A34A 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  color: "white",
                  cursor: "pointer",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
                title="View profile"
              >
                {profilePhoto ? (
                  <img
                    src={`${API_BASE_URL}/get_profile_photo.php?f=${encodeURIComponent(profilePhoto)}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "28px", fontWeight: "600" }}>
                    {user?.username
                      ? user.username.length >= 2
                        ? user.username
                            .split(/\s+/)
                            .map((s) => s[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : user.username.slice(0, 2).toUpperCase()
                      : ""}
                  </span>
                )}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 4px 0",
                  }}
                >
                  {user?.username || "Loading..."}
                </h2>
                <p
                  style={{
                    color: "#6B7280",
                    marginTop: "4px",
                    margin: "0 0 8px 0",
                  }}
                >
                  {email}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: "500",
                    backgroundColor: "#D1FAE5",
                    color: "#065F46",
                  }}
                >
                  Active Account
                </span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "16px",
                paddingLeft: "4px",
              }}
            >
              Account Settings
            </h3>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
              }}
            >
              <SettingItem
                icon={MailIcon}
                label="Email Address"
                value={email}
                onClick={() => setCurrentPage("email")}
                color="blue"
              />
              <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
              <SettingItem
                icon={PhoneIcon}
                label="Phone Number"
                value={phone}
                onClick={() => setCurrentPage("phone")}
                color="purple"
              />
              <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
              <SettingItem
                icon={BuildingIcon}
                label="University"
                value={university}
                onClick={() => setCurrentPage("university")}
                color="orange"
              />
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "16px",
                paddingLeft: "4px",
              }}
            >
              Preferences
            </h3>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
              }}
            >
              <SettingItem
                icon={BellIcon}
                label="Notifications"
                value="Manage your notification preferences"
                onClick={() => setCurrentPage("notifications")}
                color="yellow"
              />
              <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
              <SettingItem
                icon={ShieldIcon}
                label="Privacy & Security"
                value="Control your privacy settings"
                onClick={() => setCurrentPage("privacy")}
                color="red"
              />
            </div>
          </div>

          {/* Log Out Button */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                color: "#DC2626",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FEF2F2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <LogOutIcon />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Nav Button Component
type NavButtonProps = {
  icon: React.ComponentType;
  label: string;
  active?: boolean;
  onClick: () => void;
};

function NavButton({ icon: Icon, label, active, onClick }: NavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "8px",
        transition: "all 0.2s",
        marginBottom: "4px",
        backgroundColor: active
          ? "#D1FAE5"
          : isHovered
            ? "#F3F4F6"
            : "transparent",
        color: active ? "#065F46" : "#374151",
        fontWeight: active ? "500" : "400",
        border: "none",
        cursor: "pointer",
        fontSize: "15px",
        textAlign: "left",
      }}
    >
      <div style={{ color: active ? "#16A34A" : "#6B7280" }}>
        <Icon />
      </div>
      <span>{label}</span>
    </button>
  );
}

// Setting Item Component
type SettingItemProps = {
  icon: React.ComponentType;
  label: string;
  value: string;
  onClick: () => void;
  color: string;
};

function SettingItem({
  icon: Icon,
  label,
  value,
  onClick,
  color,
}: SettingItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: { bg: "#DBEAFE", text: "#1D4ED8" },
    purple: { bg: "#E9D5FF", text: "#7C3AED" },
    orange: { bg: "#FED7AA", text: "#C2410C" },
    yellow: { bg: "#FEF3C7", text: "#B45309" },
    red: { bg: "#FEE2E2", text: "#DC2626" },
  }[color] || { bg: "#DBEAFE", text: "#1D4ED8" };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        backgroundColor: isHovered ? "#F9FAFB" : "transparent",
        transition: "background-color 0.2s",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: colorClasses.bg,
          color: colorClasses.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontWeight: "500",
            color: "#111827",
            margin: "0 0 2px 0",
            fontSize: "15px",
          }}
        >
          {label}
        </h4>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>{value}</p>
      </div>
      <div
        style={{
          color: isHovered ? "#16A34A" : "#9CA3AF",
          transition: "all 0.2s",
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <ChevronRightIcon />
      </div>
    </button>
  );
}

// Email Settings Page
type EmailPageProps = {
  email: string;
  updateEmail: (s: string) => Promise<boolean>;
  goBack: () => void;
  errorMessage: string;
  successMessage: string;
};

function EmailPage({
  email,
  updateEmail,
  goBack,
  errorMessage,
  successMessage,
}: EmailPageProps) {
  const [tempEmail, setTempEmail] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState("");
  const visibleMessage = localError || errorMessage || successMessage;
  const isErrorMessage = Boolean(localError || errorMessage);

  const handleSave = async () => {
    const trimmed = tempEmail.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setLocalError("Please enter a valid email address.");
      return;
    }
    if (!trimmed.toLowerCase().endsWith(".edu")) {
      setLocalError("Please use a college email address (.edu).");
      return;
    }

    setLocalError("");
    const success = await updateEmail(trimmed);

    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span>Back to Settings</span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Email Address
          </h1>
          <p
            style={{
              color: "#6B7280",
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Manage your email address for account notifications and updates
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "16px",
              borderBottom: "1px solid #F3F4F6",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#DBEAFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1D4ED8",
              }}
            >
              <MailIcon />
            </div>
            <div>
              <h3
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Primary Email
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                This email is used for all communications
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                setIsEditing(true);
                if (localError) setLocalError("");
              }}
              placeholder="your.email@university.edu"
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px",
                fontSize: "16px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16A34A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
            {visibleMessage && (
              <p
                style={{
                  margin: "8px 0 0 0",
                  color: isErrorMessage ? "#D4183D" : "#16A34A",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {visibleMessage}
              </p>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#1E3A8A",
                margin: 0,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <strong>Important:</strong> Your email address is used for account
              notifications, password resets, and important updates.
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              style={{
                width: "100%",
                height: "48px",
                backgroundColor: "#16A34A",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#15803D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#16A34A")
              }
            >
              <SaveIcon />
              Save Changes
            </button>
          )}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "24px",
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: "#111827",
              marginBottom: "12px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Email Verification
          </h4>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: "0 0 4px 0",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Your email is verified
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9CA3AF",
                  marginTop: "4px",
                  margin: 0,
                }}
              >
                Verified on January 15, 2026
              </p>
            </div>
            <div
              style={{
                padding: "6px 12px",
                backgroundColor: "#D1FAE5",
                color: "#065F46",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Verified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Phone Settings Page
type PhonePageProps = {
  phone: string;
  updatePhone: (s: string) => Promise<boolean>;
  goBack: () => void;
  errorMessage: string;
  successMessage: string;
};

function PhonePage({
  phone,
  updatePhone,
  goBack,
  errorMessage,
  successMessage,
}: PhonePageProps) {
  const [tempPhone, setTempPhone] = useState(phone);
  const [isEditing, setIsEditing] = useState(false);
  const [localError, setLocalError] = useState("");
  const visibleMessage = localError || errorMessage || successMessage;
  const isErrorMessage = Boolean(localError || errorMessage);

  const handleSave = async () => {
    if (!tempPhone) {
      setLocalError("Phone number is required.");
      return;
    }

    setLocalError("");
    const success = await updatePhone(tempPhone);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span>Back to Settings</span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Phone Number
          </h1>
          <p
            style={{
              color: "#6B7280",
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Manage your phone number for SMS notifications and security
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "16px",
              borderBottom: "1px solid #F3F4F6",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#E9D5FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7C3AED",
              }}
            >
              <PhoneIcon />
            </div>
            <div>
              <h3
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Primary Phone
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Used for SMS and two-factor authentication
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="phone"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={tempPhone}
              onChange={(e) => {
                setTempPhone(e.target.value);
                setIsEditing(true);
                if (localError) setLocalError("");
              }}
              placeholder="+1 (555) 000-0000"
              style={{
                width: "100%",
                height: "48px",
                padding: "0 16px",
                fontSize: "16px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16A34A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
            {visibleMessage && (
              <p
                style={{
                  margin: "8px 0 0 0",
                  color: isErrorMessage ? "#D4183D" : "#16A34A",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {visibleMessage}
              </p>
            )}
          </div>

          <div
            style={{
              backgroundColor: "#FAF5FF",
              border: "1px solid #E9D5FF",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#581C87",
                margin: 0,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <strong>Security Tip:</strong> Add a phone number to enable SMS
              notifications and two-factor authentication.
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              style={{
                width: "100%",
                height: "48px",
                backgroundColor: "#16A34A",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#15803D")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#16A34A")
              }
            >
              <SaveIcon />
              Save Changes
            </button>
          )}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "24px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                backgroundColor: "#D1FAE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "#16A34A",
              }}
            >
              <ShieldIcon />
            </div>
            <div>
              <h4
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Two-Factor Authentication
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  marginBottom: "12px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Add an extra layer of security to your account.
              </p>
              <button
                style={{
                  height: "36px",
                  padding: "0 16px",
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  color: "#374151",
                }}
              >
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Password Change Page
type PasswordPageProps = { goBack: () => void; userId: number };

function PasswordPage({ goBack, userId }: PasswordPageProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword) {
      alert("Please enter your current password");
      return;
    }

    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/update_password.php`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        goBack();
      } else {
        alert("Failed to update password: " + result.message);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span>Back to Settings</span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
            }}
          >
            Change Password
          </h1>
          <p style={{ color: "#6B7280", marginTop: "8px", fontSize: "16px" }}>
            Update your account password for enhanced security
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "16px",
              borderBottom: "1px solid #F3F4F6",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#DC2626",
              }}
            >
              <LockIcon />
            </div>
            <div>
              <h3
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                  fontSize: "16px",
                }}
              >
                Security Update
              </h3>
              <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
                Choose a strong, unique password
              </p>
            </div>
          </div>

          {/* Current Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="currentPassword"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Current Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 48px 0 16px",
                  fontSize: "16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16A34A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
              />
              <button
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showCurrentPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="newPassword"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 48px 0 16px",
                  fontSize: "16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16A34A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
              />
              <button
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showNewPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              Confirm New Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                style={{
                  width: "100%",
                  height: "48px",
                  padding: "0 48px 0 16px",
                  fontSize: "16px",
                  border: "2px solid #E5E7EB",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#16A34A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div
            style={{
              backgroundColor: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#1E3A8A",
                margin: "0 0 8px 0",
              }}
            >
              Password Requirements:
            </p>
            <ul
              style={{
                fontSize: "13px",
                color: "#1E3A8A",
                margin: 0,
                paddingLeft: "20px",
              }}
            >
              <li>At least 8 characters long</li>
              <li>Mix of letters, numbers, and symbols recommended</li>
              <li>Different from your current password</li>
            </ul>
          </div>

          {/* Update Button */}
          <button
            onClick={handleChangePassword}
            style={{
              width: "100%",
              height: "48px",
              backgroundColor: "#16A34A",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#15803D")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#16A34A")
            }
          >
            <KeyIcon />
            Update Password
          </button>
        </div>

        {/* Security Tips */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "24px",
          }}
        >
          <h4
            style={{
              fontWeight: "600",
              color: "#111827",
              marginBottom: "12px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ShieldIcon />
            Security Tips
          </h4>
          <ul
            style={{
              fontSize: "14px",
              color: "#6B7280",
              margin: 0,
              paddingLeft: "20px",
              lineHeight: "1.6",
            }}
          >
            <li>Use a unique password you don't use elsewhere</li>
            <li>Consider using a password manager</li>
            <li>Enable two-factor authentication for extra security</li>
            <li>Never share your password with anyone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// University Settings Page — same list as sign-up (AcademicInfo / schools.json)
type UniversityPageProps = {
  university: string;
  updateUniversity: (s: string) => Promise<boolean>;
  goBack: () => void;
};

const UNIVERSITY_OPTIONS: string[] = (schoolData as { name: string }[]).map(
  (s) => s.name,
);

function UniversityPage({
  university,
  updateUniversity,
  goBack,
}: UniversityPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUniversities = UNIVERSITY_OPTIONS.filter((uni) =>
    uni.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = async (uni: string) => {
    const success = await updateUniversity(uni);
    if (success) {
      alert(`University changed to ${uni}`);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span>Back to Settings</span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            University
          </h1>
          <p
            style={{
              color: "#6B7280",
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Select your university to personalize your experience
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "32px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "16px",
              borderBottom: "1px solid #F3F4F6",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#FED7AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C2410C",
              }}
            >
              <BuildingIcon />
            </div>
            <div>
              <h3
                style={{
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Current University
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6B7280",
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {university}
              </p>
            </div>
          </div>

          <div style={{ position: "relative", marginBottom: "24px" }}>
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9CA3AF",
                pointerEvents: "none",
              }}
            >
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "44px",
                paddingRight: "16px",
                fontSize: "16px",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#16A34A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              maxHeight: "384px",
              overflowY: "auto",
            }}
          >
            {filteredUniversities.map((uni) => (
              <button
                key={uni}
                onClick={() => handleSelect(uni)}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.2s",
                  backgroundColor: uni === university ? "#D1FAE5" : "#F9FAFB",
                  border:
                    uni === university
                      ? "2px solid #16A34A"
                      : "2px solid transparent",
                  cursor: "pointer",
                  fontSize: "16px",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (uni !== university) {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }
                }}
                onMouseLeave={(e) => {
                  if (uni !== university) {
                    e.currentTarget.style.backgroundColor = "#F9FAFB";
                  }
                }}
              >
                <span
                  style={{
                    fontWeight: "500",
                    color: uni === university ? "#065F46" : "#374151",
                  }}
                >
                  {uni}
                </span>
                {uni === university && (
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#16A34A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    <CheckIcon />
                  </div>
                )}
              </button>
            ))}
            {filteredUniversities.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "32px",
                  color: "#6B7280",
                }}
              >
                No universities found
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#1E3A8A",
              margin: 0,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <strong>Note:</strong> Changing your university will update your
            campus community access.
          </p>
        </div>
      </div>
    </div>
  );
}

// Notifications Settings Page
type NotificationsPageProps = {
  settings: NotificationsSettings;
  updateSettings: (s: NotificationsSettings) => Promise<boolean>;
  goBack: () => void;
};

function NotificationsPage({
  settings,
  updateSettings,
  goBack,
}: NotificationsPageProps) {
  const toggleSetting = async (key: keyof NotificationsSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    await updateSettings(newSettings);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span>Back to Settings</span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Notifications
          </h1>
          <p
            style={{
              color: "#6B7280",
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Manage how you receive updates and alerts
          </p>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
              paddingLeft: "4px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Notification Channels
          </h3>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <ToggleItem
              icon={MailIcon}
              label="Email Notifications"
              description="Receive updates via email"
              checked={settings.email}
              onChange={() => toggleSetting("email")}
              color="blue"
            />
            <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
            <ToggleItem
              icon={SmartphoneIcon}
              label="Push Notifications"
              description="Get instant alerts on your device"
              checked={settings.push}
              onChange={() => toggleSetting("push")}
              color="purple"
            />
            <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
            <ToggleItem
              icon={MessageSquareIcon}
              label="SMS Notifications"
              description="Receive text messages"
              checked={settings.sms}
              onChange={() => toggleSetting("sms")}
              color="green"
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#FEF3C7",
            border: "1px solid #FDE68A",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ color: "#92400E", flexShrink: 0, marginTop: "2px" }}>
              <BellIcon />
            </div>
            <p
              style={{
                fontSize: "14px",
                color: "#78350F",
                margin: 0,
                fontFamily: "Inter, sans-serif",
              }}
            >
              <strong>Tip:</strong> Enable push notifications to stay up-to-date
              with important updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Privacy Settings Page
type PrivacyPageProps = {
  settings: PrivacySettings;
  updateSettings: (s: PrivacySettings) => Promise<boolean>;
  goBack: () => void;
  setCurrentPage: (p: string) => void;
};

function PrivacyPage({
  settings,
  updateSettings,
  goBack,
  setCurrentPage,
}: PrivacyPageProps) {
  const toggleSetting = async (key: keyof PrivacySettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    await updateSettings(newSettings);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "768px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span style={{ fontFamily: "Inter, sans-serif" }}>
              Back to Settings
            </span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Privacy & Security
          </h1>
          <p
            style={{
              color: "#6B7280",
              marginTop: "8px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Control your privacy settings and account security
          </p>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
              paddingLeft: "4px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Profile Privacy
          </h3>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <ToggleItem
              icon={EyeIcon}
              label="Public Profile"
              description="Make your profile visible to other students"
              checked={settings.profileVisible}
              onChange={() => toggleSetting("profileVisible")}
              color="blue"
            />
            <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
            <ToggleItem
              icon={EyeIcon}
              label="Show Email Address"
              description="Display email on your public profile"
              checked={settings.showEmail}
              onChange={() => toggleSetting("showEmail")}
              color="purple"
            />
            <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
            <ToggleItem
              icon={EyeOffIcon}
              label="Show Phone Number"
              description="Display phone on your public profile"
              checked={settings.showPhone}
              onChange={() => toggleSetting("showPhone")}
              color="orange"
            />
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
              paddingLeft: "4px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Data & Security
          </h3>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <ToggleItem
              icon={DatabaseIcon}
              label="Data Sharing"
              description="Share anonymized data to improve services"
              checked={settings.dataSharing}
              onChange={() => toggleSetting("dataSharing")}
              color="green"
            />
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
              paddingLeft: "4px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Security Actions
          </h3>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <SecurityActionButton
              icon={LockIcon}
              label="Change Password"
              description="Update your account password"
              color="red"
              onClick={() => setCurrentPage("password")}
            />
            <div style={{ borderBottom: "1px solid #F3F4F6" }}></div>
            <SecurityActionButton
              icon={KeyIcon}
              label="Two-Factor Authentication"
              description="Add an extra layer of security"
              color="blue"
              onClick={() =>
                alert("Opening two-factor authentication setup...")
              }
            />
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ color: "#991B1B", flexShrink: 0, marginTop: "2px" }}>
              <ShieldIcon />
            </div>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#7F1D1D",
                  fontWeight: "500",
                  marginBottom: "4px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Security Recommendation
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#991B1B",
                  margin: 0,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                We recommend enabling two-factor authentication and keeping your
                password secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Security Action Button Component
type SecurityActionButtonProps = {
  icon: React.ComponentType;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
};

function SecurityActionButton({
  icon: Icon,
  label,
  description,
  color,
  onClick,
}: SecurityActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: { bg: "#DBEAFE", text: "#1D4ED8" },
    red: { bg: "#FEE2E2", text: "#DC2626" },
  }[color] || { bg: "#DBEAFE", text: "#1D4ED8" };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        backgroundColor: isHovered ? "#F9FAFB" : "transparent",
        transition: "background-color 0.2s",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: colorClasses.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colorClasses.text,
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontWeight: "500",
            color: "#111827",
            margin: 0,
            fontSize: "15px",
          }}
        >
          {label}
        </h4>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: "2px 0 0 0" }}>
          {description}
        </p>
      </div>
      <div
        style={{
          color: isHovered ? "#16A34A" : "#9CA3AF",
          transition: "all 0.2s",
        }}
      >
        <ChevronRightIcon />
      </div>
    </button>
  );
}

// Help Center Page
type HelpCenterPageProps = { goBack: () => void };

function HelpCenterPage({ goBack }: HelpCenterPageProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        'Go to Privacy & Security settings and click "Change Password". You\'ll receive a verification email to complete the process.',
    },
    {
      question: "How do I change my notification preferences?",
      answer:
        "Navigate to Settings > Preferences > Notifications to customize which notifications you receive.",
    },
    {
      question: "Can I change my university affiliation?",
      answer:
        "Yes! Go to Account Settings > University and select your institution from the list.",
    },
    {
      question: "How do I contact support?",
      answer:
        "Email us at support@university.edu or call (555) 123-4567 during business hours (9 AM - 5 PM EST).",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! We use industry-standard encryption and security measures to protect your information.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <div
        style={{ maxWidth: "896px", margin: "0 auto", padding: "32px 16px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#6B7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px",
              fontSize: "15px",
              fontWeight: "500",
              padding: "4px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#16A34A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <ArrowLeftIcon />
            <span>Back to Settings</span>
          </button>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 8px 0",
            }}
          >
            Help Center
          </h1>
          <p style={{ color: "#6B7280", marginTop: "8px", fontSize: "16px" }}>
            Find answers to common questions and get support
          </p>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
            borderRadius: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            padding: "32px",
            color: "white",
            marginBottom: "32px",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <HelpCircleIcon />
            </div>
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Need Help?
              </h2>
              <p style={{ color: "#D1FAE5", marginBottom: "16px" }}>
                Our support team is here to assist you with any questions or
                concerns.
              </p>
              <button
                onClick={() => alert("Opening email client...")}
                style={{
                  backgroundColor: "white",
                  color: "#16A34A",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#D1FAE5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "white")
                }
              >
                Contact Support
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ color: "#D1FAE5" }}>
                <MailIcon />
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "#D1FAE5", margin: 0 }}>
                  Email
                </p>
                <p style={{ fontWeight: "500", margin: 0 }}>
                  support@university.edu
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ color: "#D1FAE5" }}>
                <PhoneIcon />
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "#D1FAE5", margin: 0 }}>
                  Phone
                </p>
                <p style={{ fontWeight: "500", margin: 0 }}>(555) 123-4567</p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
              fontSize: "14px",
              color: "#D1FAE5",
            }}
          >
            <ClockIcon />
            <span>Business hours: Monday-Friday, 9 AM - 5 PM EST</span>
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "16px",
              paddingLeft: "4px",
            }}
          >
            Frequently Asked Questions
          </h3>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            {faqs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    style={{
                      width: "100%",
                      padding: "20px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      backgroundColor: "transparent",
                      transition: "background-color 0.2s",
                      border: "none",
                      borderBottom:
                        index === faqs.length - 1 && !isExpanded
                          ? "none"
                          : "1px solid #F3F4F6",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#F9FAFB")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontWeight: "500",
                          color: "#111827",
                          marginBottom: "4px",
                          fontSize: "15px",
                        }}
                      >
                        {faq.question}
                      </h4>
                      {isExpanded && (
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#6B7280",
                            lineHeight: "1.6",
                            margin: "8px 0 0 0",
                          }}
                        >
                          {faq.answer}
                        </p>
                      )}
                    </div>
                    <div
                      style={{
                        color: "#16A34A",
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                        marginTop: "4px",
                      }}
                    >
                      <ChevronDownIcon />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Toggle Item Component
type ToggleItemProps = {
  icon: React.ComponentType;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  color: string;
};

function ToggleItem({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
  color,
}: ToggleItemProps) {
  const colorClasses = {
    blue: { bg: "#DBEAFE", text: "#1D4ED8" },
    purple: { bg: "#E9D5FF", text: "#7C3AED" },
    green: { bg: "#D1FAE5", text: "#16A34A" },
    red: { bg: "#FEE2E2", text: "#DC2626" },
    yellow: { bg: "#FEF3C7", text: "#B45309" },
    pink: { bg: "#FCE7F3", text: "#DB2777" },
    orange: { bg: "#FED7AA", text: "#C2410C" },
  }[color] || { bg: "#DBEAFE", text: "#1D4ED8" };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: colorClasses.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colorClasses.text,
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div style={{ flex: 1 }}>
        <label
          htmlFor={label}
          style={{
            fontWeight: "500",
            color: "#111827",
            cursor: "pointer",
            display: "block",
            fontSize: "15px",
            marginBottom: "2px",
          }}
        >
          {label}
        </label>
        <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
          {description}
        </p>
      </div>
      <label
        style={{
          position: "relative",
          display: "inline-block",
          width: "50px",
          height: "28px",
          flexShrink: 0,
          cursor: "pointer",
        }}
      >
        <input
          id={label}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{
            opacity: 0,
            width: 0,
            height: 0,
            position: "absolute",
          }}
        />
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: checked ? "#16A34A" : "#D1D5DB",
            transition: "0.3s",
            borderRadius: "28px",
          }}
        >
          <span
            style={{
              position: "absolute",
              height: "20px",
              width: "20px",
              left: checked ? "26px" : "4px",
              bottom: "4px",
              backgroundColor: "white",
              transition: "0.3s",
              borderRadius: "50%",
            }}
          />
        </span>
      </label>
    </div>
  );
}

// Logout Page
type LogoutPageProps = { goBack: () => void };

function LogoutPage({ goBack }: LogoutPageProps) {
  const handleConfirmLogout = () => {
    alert("You have been logged out successfully!");
    // Here you would typically:
    // - Clear authentication tokens
    // - Redirect to login page
    // - Clear user data
    console.log("User logged out");
    goBack();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E7EB",
            padding: "48px 32px",
            textAlign: "center",
          }}
        >
          {/* Logout Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              color: "white",
              boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.3)",
            }}
          >
            <LogOutIcon />
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Log Out?
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "16px",
              color: "#6B7280",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}
          >
            Are you sure you want to log out of your account? You'll need to
            sign in again to access your settings.
          </p>

          {/* Action Buttons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <button
              onClick={handleConfirmLogout}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#DC2626",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#B91C1C")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#DC2626")
              }
            >
              <LogOutIcon />
              Yes, Log Out
            </button>

            <button
              onClick={goBack}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "white",
                color: "#374151",
                border: "2px solid #E5E7EB",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F9FAFB";
                e.currentTarget.style.borderColor = "#16A34A";
                e.currentTarget.style.color = "#16A34A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.color = "#374151";
              }}
            >
              Cancel
            </button>
          </div>

          {/* Additional Info */}
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              backgroundColor: "#FEF2F2",
              borderRadius: "8px",
              border: "1px solid #FECACA",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#991B1B",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              <strong>Note:</strong> Your settings and data will be saved. You
              can sign back in anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;