import { useEffect, useState } from "react";
import "./App.css";
import _axios from "./api/_axios";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [image, setImage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);

  const [numberLambda, setNumberLambda] = useState("");
  const [resultLambda, setResultLambda] = useState(null);

  const fetchData = async () => {
    try {
      const res = await _axios.get(`message/`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await _axios.post("/message/", { message: newMessage });
      setTrigger(!trigger);
      setNewMessage("");
    } catch (err) {
      setError(err.response.data);
      setTrigger(!trigger);
      setNewMessage("");
    }
  };

  const handleGetImage = async () => {
    try {
      const response = await _axios.get("/search/", {
        params: { q: imagePrompt },
      });

      console.log(response.data);
      setImagePrompt("");
      setTrigger(!trigger);
      setImage(response.data.images_results[0].thumbnail);
    } catch (error) {
      // Handle errors
      console.error("Error in image search:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [trigger]);

  ////////////////////////////////////////////////
  const handleHeavyComputation = async () => {
    try {
      const response = await _axios.post("/heavy-computation", {
        number: parseInt(number, 10),
      });

      setResult(response.data.factors);
    } catch (error) {
      console.error("Error performing heavy computation:", error);
    }
  };
////////////////////////////////////
const handleHeavyComputationLambda = async () => {
  try {
    const response = await axios.post("https://530pk4th0c.execute-api.eu-central-1.amazonaws.com/factor", {
      number: parseInt(numberLambda, 10),
    });

    setResultLambda(response.data.factors);
  } catch (error) {
    console.error("Error performing heavy computation:", error);
  }
};


  return (
    <div className=" bg-blue-500 h-full ">
      <h1 className="text-2xl font-bold  text-center">
        SWE 590 Cloud Term Project <br /> Omar Ghamrawi - 2022719072
      </h1>
      <div className="flex items-center mt-10 w-4/5 mx-auto">
        <div
          className="w-2/4 p-4 bg-slate-300 rounded-lg my-6 shadow-md"
          style={{ overflowY: "auto" }}
        >
          <h1 className="text-2xl font-bold mb-4">Messaging</h1>

          <div className="overflow-y-auto bg-white p-4 max-h-72">
            {messages ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  className="mb-2 border border-gray-300 p-1 w-fit rounded-md shadow-md"
                >
                  <p className="text-gray-700">{message.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Messages</p>
            )}
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>

        <div className="w-1/2 p-4 bg-slate-300  rounded-lg shadow-md ml-4 justify-center">
          <h1 className="text-2xl font-bold mb-4">Find a Photo</h1>

          <div className="overflow-y-auto bg-white p-4 h-72 max-h-72">
            {image && <img src={image} alt="Generated Image" />}
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter Image Prompt..."
              className="flex-1 border border-gray-300 p-2 rounded-md focus:outline-none"
            />
            <button
              onClick={handleGetImage}
              className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5  flex items-center justify-center">
        <div className="bg-slate-300 p-8 w-10/12 rounded-md shadow-md">
          Calculated on Server on EC2
          <label className="block mb-4 text-lg font-bold">
            Enter a Number:
          </label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
          />{" "}
          <label className="block mb-4 text-lg font-bold">Result:</label>
          {result && (
            <div className="mt-4 border border-gray-300 rounded-lg border-solid h-fit bg-white">
              <p className="text-gray-700">Factors: {result.join(", ")}</p>
            </div>
          )}
          <button
            onClick={handleHeavyComputation}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Perform Heavy Computation
          </button>
        </div>
      </div>

      <div className="mt-5 mb-5  flex items-center justify-center">
        <div className="bg-slate-300 p-8 w-10/12 rounded-md shadow-md">
          Calculated on Lambda
          <label className="block mb-4 text-lg font-bold">
            Enter a Number:
          </label>
          <input
            type="text"
            value={numberLambda}
            onChange={(e) => setNumberLambda(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none w-full"
          />{" "}
          <label className="block mb-4 text-lg font-bold">Result:</label>
          {resultLambda && (
            <div className="mt-4 border border-gray-300 rounded-lg border-solid h-fit bg-white">
              <p className="text-gray-700">Factors: {resultLambda.join(", ")}</p>
            </div>
          )}
          <button
            onClick={handleHeavyComputationLambda}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Perform Heavy Computation
          </button>
        </div>
      </div>

     
    </div>
  );
}

export default App;
