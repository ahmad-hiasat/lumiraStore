"use client"
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store";
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { changePasswordOtpUser } from "@/features/auth/LoginThunks";

const ForgetPasswordOtp = () => {
  const t = useTranslations("Register");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { errorActivate, messageActivate } = useSelector(
    (state: RootState) => state.forget
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
      const userId = Cookies.get("user_id"); // ✅ نجيب الـ id من الكوكي

      if (!userId) return;

      dispatch(changePasswordOtpUser({ id: userId, otp: code }))
        .unwrap()
        .then((res) => {
          if (res.status) {
            router.push("/reset-password");
          }
        })
        .catch(() => {
          setCodeInputs(["", "", "", "", "", "", ""]);
          inputsRef.current[0]?.focus();
        });
    }
  }, [codeInputs, dispatch, router]);

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold mb-6">{t("password")}</h1>
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

      {errorActivate && (
        <p className="mt-4 text-red-600 text-center">{errorActivate}</p>
      )}
      {messageActivate && (
        <p className="mt-4 text-green-600 text-center">{messageActivate}</p>
      )}

  
    </div>
  );
};

export default ForgetPasswordOtp;
