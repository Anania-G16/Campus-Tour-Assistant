export default function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div 
        className="absolute inset-1 bg-cover bg-center"
        style={{ backgroundImage: "url('src/Asset/gateway.jpg')" }}
      > 
      </div>
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] ">
       
        <div className="bg-black/100 backdrop-blur-sm rounded-2xl px-12 py-8 text-center mb-12 shadow-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-700 leading-tight">
              WELCOME TO OUR
              <br />
              CAMPUS
              <br />
              TOUR ASSISTANT
            </h1>
            <p className="text-black-600 mt-4">feel at ease finding directions</p>
          </div>
      </main>
    </div>
  );
}
