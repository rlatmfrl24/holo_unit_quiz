"use client";

const AdminPage = () => {
  return (
    <div className="w-full flex flex-col items-center flex-1 justify-center h-screen font-poppins">
      <div className="flex flex-col items-center my-4">
        <h1 className="font-bold text-4xl">Admin Page</h1>
        <p>Only logged in users can see this page.</p>
      </div>
      <form
        className="flex flex-col w-fit"
        onSubmit={(e) => {
          e.preventDefault();
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
        />
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
        />
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
    </div>
  );
};

export default AdminPage;
