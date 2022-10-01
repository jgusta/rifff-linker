import { useState } from "preact/hooks";
// import { BASE_URL } from "../util/config.ts";
export default function LinkConvertor(props) {
  const [inser, setValue] = useState("");
  const [output, setOutput] = useState(<></>);
  const regex = /endlesss:\/\/sharedrifff\/([a-f0-9]{32})\/?/
  
  const BASE_URL = props.baseUrl;
  
  const onChange = function (e) {
    const target = e.target.value;
    setValue(target);
    console.log('run')
    if(regex.test(target)) {
      const rifffId = target.match(regex)[1]
      setOutput(<span>`${BASE_URL}/rifff/${rifffId}`</span>);
    }
    else {
      console.log('setoutput')
      setOutput(<span>Enter an <b>endlesss://</b> style link</span>)
    }
  };

  //endlesss://sharedrifff/b0aff6b039b111edb6b0371b1bc0a57f
  return (
    <div className="mb-12">
      <div>
        <label htmlFor="url_paste">Enter Endlesss Rifff Link</label>
        <input
          id="url_paste"
          type="text"
          value={inser}
          onInput={onChange}
          class="text-black border-solid border-2 border-black-500"
        />
        <br></br>
        <input
          id="url_out"
          type="text"
          // value={output}
          class="text-black"
        />
        {output}
      </div>
    </div>
  );
}
