const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <main className="flex w-full max-w-3xl flex-col items-center text-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-main-title">
          Build Faster with OnestopRx
        </h1>

        <p className="text-lg leading-7 text-sub-title max-w-xl">
          {' '}
          This template is pre-configured to help you ship new onestoprx
          products and features quickly.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a
            href="#"
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
          >
            Start a New Module
          </a>
        </div>

        <p className="text-sm text-sub-title mt-8">
          Designed for scalability across all OnestopRx products.
        </p>
      </main>
    </div>
  );
};

export default Home;
