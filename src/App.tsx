function App() {
  return (
    <div className='bg-background p-spacing-10xl flex min-h-screen flex-col items-center justify-center text-white'>
      <div className='custom-container flex-center gap-spacing-xl rounded-radius-2xl p-spacing-6xl flex-col border border-neutral-700 bg-neutral-900'>
        <h1 className='text-display-lg text-primary-300 font-bold'>
          Movie Explorer App
        </h1>
        <p className='text-md text-neutral-400'>
          Exploring the cinematic world with high-quality tokens.
        </p>
        <div className='gap-spacing-md flex'>
          <button className='rounded-radius-md bg-primary-300 px-spacing-xl py-spacing-md hover:bg-primary-400 text-sm font-semibold text-white transition-colors'>
            Explore Movies
          </button>
          <button className='rounded-radius-md px-spacing-xl py-spacing-md border border-neutral-700 bg-neutral-800 text-sm font-semibold text-neutral-200 transition-colors hover:bg-neutral-700'>
            View Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
