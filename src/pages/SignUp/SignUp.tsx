import { useForm } from "react-hook-form";
import { Link } from "react-router";
import Button from "../../shared/layout/Button";
import image from "../../assets/safestargram.png";
import { useSignUp } from "../../shared/hooks/useSignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearAccessToken } from "../../store/authSlice";
import { clearUserInfo } from "../../store/userSlice";

interface FormData {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({ mode: "onChange" });

  const dispatch = useDispatch();

  const { mutate: signUp, isPending } = useSignUp();

  useEffect(() => {
    dispatch(clearAccessToken());
    dispatch(clearUserInfo());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 min-h-screen bg-gray-50 py-10">
      <img src={image} className="w-32 h-32" />
      <div className="flex flex-col items-center text-3xl text-brand font-bold">
        <div>세이프스타그램</div>
        <div>회원가입</div>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit((data) => signUp(data))}
        className="flex flex-col gap-3 w-full max-w-sm"
      >
        <label htmlFor="name">이름</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          id="name"
          placeholder="이름을 입력하세요"
          type="text"
          {...register("name", { required: "필수항목입니다." })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <label htmlFor="email">이메일</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          id="email"
          placeholder="이메일 주소를 입력하세요"
          type="text"
          {...register("email", {
            required: "필수항목입니다.",
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
          id="password"
          placeholder="비밀번호를 입력하세요"
          type="password"
          {...register("password", {
            required: "필수항목입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자리 이상입니다.",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <label htmlFor="checkPassword">비밀번호 확인</label>
        <input
          className="rounded-full border p-3 placeholder:text-sm focus:outline-none"
          id="checkPassword"
          placeholder="비밀번호를 다시 입력하세요"
          type="password"
          {...register("checkPassword", {
            required: "필수항목입니다.",
            validate: (value, formValues) =>
              value === formValues.password || "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.checkPassword && (
          <p className="text-red-500">{errors.checkPassword.message}</p>
        )}
        <Button disabled={!isValid} className=" rounded-full font-bold mt-5 ">
          {isPending ? "가입 중..." : "가입하기"}
        </Button>
      </form>
      <div className="flex gap-3">
        <div>이미 계정이 있으신가요?</div>
        <Link
          to="/login"
          className="text-brand hover:text-orange-300 transition"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
