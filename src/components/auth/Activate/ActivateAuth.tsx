"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store";
import { fetchUserData } from "@/features/userData/userDataThunks";
import Cookies from "js-cookie";
import { activateUser } from "@/features/auth/ActivateThunks";

const ActivateAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error, message, user } = useSelector(
    (state: RootState) => state.activate
  );
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;
    const newCodeInputs = [...codeInputs];
    newCodeInputs[index] = val;
    setCodeInputs(newCodeInputs);
    if (val && index < 6) {
      inputsRef.current[index + 1]?.focus();
    }
    if (!val && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !codeInputs[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (codeInputs.every((c) => c !== "")) {
      const codeString = codeInputs.join("");
      const code = parseInt(codeString, 10);
      const email = Cookies.get("Register_email");

      if (!email) return;

      dispatch(activateUser({ email, otp: code }))
        .unwrap()
        .then(() => {
          dispatch(fetchUserData());
        })
        .catch(() => {
          setCodeInputs(["", "", "", "", "", "", ""]);
          inputsRef.current[0]?.focus();
        });
    }
  }, [codeInputs, dispatch]);

  useEffect(() => {
    if (user?.id) {
      Cookies.set("user_id", user.id.toString(), { expires: 1 });
      router.push("/");
    }
  }, [user, router]);

  const handleResentCode = () => {
    const email = Cookies.get("Register_email");
    if (!email) return;
    // dispatch(resentUser({ email }));
  };

  return (
    <div className="container max-w-md py-8">
      <div className="flex justify-center gap-4 mb-6">
        {codeInputs.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-14 h-14 text-center text-xl border rounded-md"
            value={value}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputsRef.current[index] = el!;
            }}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {error&& <p className="mt-4 text-red-600 text-center">{error}</p>}
      {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
      <button
        type="button"
        onClick={handleResentCode}
        disabled={loading}
        className="cursor-pointer text-blue-600 hover:underline mt-4"
      >
        resend_code
      </button>
    </div>
  );
};

export default ActivateAuth;
