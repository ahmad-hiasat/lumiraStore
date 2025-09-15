"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store";
import Cookies from "js-cookie";
import { resetPasswordUser } from "@/features/auth/LoginThunks";

const ResetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, message } = useSelector((state: RootState) => state.forget);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const userId = Cookies.get("user_id");
    if (!userId) return;

    dispatch(resetPasswordUser({ id: userId, password }))
      .unwrap()
      .then((res) => {
            console.log("API response:", res);
    console.log("lolfsdf ");

        if (res.status) {
          alert("Password changed successfully!");
          router.push("/login");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md"
        >
          {loading ? "Saving..." : "Save New Password"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {message && <p className="text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default ResetPassword;
