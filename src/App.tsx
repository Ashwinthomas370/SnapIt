import UploadFile from "./components/UploadFile";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-80">
        <h1 className="text-6xl font-bold text-center">
          Snap It: Capture, Convert, Edit
        </h1>
      </div>
      <div className="flex justify-center">
        <UploadFile />
      </div>
    </>
  );
}

export default App;
