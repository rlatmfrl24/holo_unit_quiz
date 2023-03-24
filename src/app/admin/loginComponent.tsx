import { useForm } from "react-hook-form";
import { useAdminStore } from "./store";

const LoginComponent = () => {
  const onSubmit = (data: any) => {
    console.log(data);
    doLogin(data.email, data.password);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const setAdmin = useAdminStore((state) => state.setIsLogin);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const doLogin = (email: string, password: string) => {
    console.log("doLogin");
    if (adminEmail === email && adminPassword === password) {
      setAdmin(true);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="font-bold text-4xl">Admin Page</h1>
        <p>Only logged in users can see this page.</p>
      </div>
      <form
        className="flex flex-col w-fit"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <label htmlFor="email">Email</label>
        <input
          className="
            appearance-none
            w-64
            h-10
            font-semibold
            border
            border-gray-300
            rounded-md
            shadow-sm
            focus:outline-none
            focus:ring-indigo-500
            focus:border-indigo-500
            px-2   
            mb-3
        "
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <label htmlFor="password">Password</label>
        <input
          className="
            appearance-none
            w-64
            h-10
            font-semibold
            border
            border-gray-300
            rounded-md
            shadow-sm
            focus:outline-none
            focus:ring-indigo-500
            focus:border-indigo-500
            px-2   
        "
          type="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}

        <button
          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            font-bold
            py-2
            px-4
            rounded
            my-4
            text-2xl"
          type="submit"
        >
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginComponent;
