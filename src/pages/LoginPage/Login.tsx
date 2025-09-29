import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Button from "../../shared/layout/Button";
import image from "../../assets/safestargram.png";
import { useLogin } from "../../shared/hooks/useLogin";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAccessToken } from "../../store/authSlice";
import { clearUserInfo } from "../../store/userSlice";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({ mode: "onSubmit" });
  const dispatch = useDispatch();

  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    dispatch(clearAccessToken());
    dispatch(clearUserInfo());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen bg-gray-50 py-10">
      <img src={image} className="w-32 h-32" />
      <div className="text-3xl text-brand font-bold mb-10">세이프스타그램</div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => login(data))}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <label htmlFor="email">이메일</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          placeholder="이메일"
          id="email"
          type="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 양식을 지켜주세요. ex) example@ex.com",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <label htmlFor="password">비밀번호</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          placeholder="비밀번호"
          id="password"
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상이어야 합니다.",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <Button disabled={!isValid} className="rounded-full font-bold mt-5">
          {isPending ? "로그인 중..." : "로그인"}
        </Button>
      </form>
      <div className="flex gap-3">
        <div>계정이 없으신가요?</div>
        <Link
          to="/signup"
          className="text-brand hover:text-orange-300 transition"
        >
          가입하기
        </Link>
      </div>
    </div>
  );
}
