import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";

const Profile: React.FC = () => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState(
    user?.displayName || ""
  );
  const [email] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Profile update
  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError("User not found");
      return;
    }

    try {
      setLoading(true);

      await updateProfile(user, {
        displayName: displayName,
      });

      setSuccess("Profile updated successfully!");
    } catch (error: any) {
      setError(error.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!user) {
      setError("User not found");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      await deleteUser(user);

      setSuccess("Account deleted successfully.");
    } catch (error: any) {
      setError(error.message || "Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">

            {/* Profile Card */}
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-4 p-md-5">

                {/* Header */}
                <div className="text-center mb-4">
                  <div
                    className="bg-primary bg-opacity-10 text-primary rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                    }}
                  >
                    <span className="fs-1">👤</span>
                  </div>

                  <h1 className="h3 fw-bold mb-1">
                    Your Profile
                  </h1>

                  <p className="text-muted mb-0">
                    Manage your account information
                  </p>
                </div>

                {/* Success Message */}
                {success && (
                  <div
                    className="alert alert-success d-flex align-items-center"
                    role="alert"
                  >
                    <span className="me-2">✓</span>
                    <div>{success}</div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div
                    className="alert alert-danger d-flex align-items-center"
                    role="alert"
                  >
                    <span className="me-2">!</span>
                    <div>{error}</div>
                  </div>
                )}

                {/* Profile Form */}
                <form onSubmit={handleUpdateProfile}>

                  {/* Display Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="displayName"
                      className="form-label fw-semibold"
                    >
                      Display Name
                    </label>

                    <input
                      id="displayName"
                      type="text"
                      className="form-control form-control-lg"
                      value={displayName}
                      onChange={(e) =>
                        setDisplayName(e.target.value)
                      }
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      className="form-control form-control-lg bg-light"
                      value={email}
                      disabled
                      readOnly
                    />

                    <div className="form-text">
                      Your email address cannot be changed here.
                    </div>
                  </div>

                  {/* Update Button */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>

                {/* Divider */}
                <hr className="my-4" />

                {/* Danger Zone */}
                <div>
                  <h5 className="fw-bold text-danger mb-2">
                    Danger Zone
                  </h5>

                  <p className="text-muted small mb-3">
                    Deleting your account is permanent and cannot
                    be undone.
                  </p>

                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    onClick={handleDeleteAccount}
                    disabled={loading}
                  >
                    Delete Account
                  </button>
                </div>

              </div>
            </div>

            {/* Footer */}
            <p className="text-center text-muted small mt-4">
              Keep your profile information up to date.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
