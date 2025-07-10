import { default as React, useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (passwordRef.current) {
      if (ref.current && typeof ref.current.src === 'string') {
        if (ref.current.src.includes("icons/eyecross.png")) {
          ref.current.src = "icons/eye.png";
          passwordRef.current.type = "password";
        } else {
          passwordRef.current.type = "text";
          ref.current.src = "icons/eyecross.png";
        }
      } else {
        // Fallback if eye icon ref is not as expected, just toggle type
        passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
      }
    }
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
      setform({ site: "", username: "", password: "" });
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast('Error: Password not saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter(i => i.id === id)[0]);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const generatePassword = () => {
    const length = 14;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let newPassword = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      newPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setform({ ...form, password: newPassword });

    if (passwordRef.current) {
      // Ensure the password field type is 'text' so the user can see the generated password
      passwordRef.current.type = "text";
      // Optionally, toggle the eye icon if you have one that shows password visibility state
      if (ref.current && typeof ref.current.src === 'string' && ref.current.src.includes("icons/eyecross.png")) {
        ref.current.src = "icons/eye.png";
      } else if (ref.current && typeof ref.current.src === 'string') {
        // If it's not eyecross, but we made password visible, ensure it's the open eye
        ref.current.src = "icons/eye.png";
      }
    }

    toast('New password generated!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />
      <div className="absolute inset-0 w-full h-full -z-10 bg-purple-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:mycontainer min-h-[80.7vh]">
        <h1 className="text-4xl font-bold text-center text">
          <span className="text-purple-400">&lt; </span>
          pass<span className="text-purple-500">KEEPER/ &gt;</span>
        </h1>
        <p className="text-lg text-center text-purple-900">
          Your own Password Manager
        </p>
        <div className="flex flex-col items-center gap-6 p-4 text-black md:gap-8 md:p-6">
          <input value={form.site} onChange={handleChange} placeholder="Enter website URL*"
            className="w-full p-4 py-1 border border-purple-500 rounded-full"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col w-full gap-4 md:flex-row">
            <input value={form.username} onChange={handleChange} placeholder="Enter Username*"
              className="w-full p-4 py-1 border border-purple-500 rounded-full"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password*"
                className="w-full p-4 py-1 border border-purple-500 rounded-full"
                type="password"
                name="password"
                id="password"
              />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={26} src="icons/eyecross.png" alt="eye" />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <button onClick={savePassword} className="flex items-center justify-center gap-2 px-8 py-2 text-white bg-blue-600 border border-purple-700 rounded-full w-fit hover:bg-purple-300">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>Save Password</button>
            <button onClick={generatePassword} className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-600 border border-green-700 rounded-full w-fit hover:bg-green-400">
            Generate Password
            </button>
          </div>
        </div>
        <div className="passwords">
          <div className="flex items-center justify-between">
            <h2 className="py-4 text-xl font-bold">Your Passwords</h2>
            <input
              type="text"
              placeholder="Search passwords..."
              className="px-4 py-1 mb-2 border border-purple-500 rounded-full md:mb-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {passwordArray.filter(item =>
            item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
          ).length === 0 && <div>No matching passwords found. {passwordArray.length > 0 && searchTerm.length > 0 ? '(Try a different search term)' : searchTerm.length === 0 && passwordArray.length === 0 ? '(No passwords saved yet)' : ''}</div>}
          {passwordArray.filter(item =>
            item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
          ).length !== 0 &&
            <div className="overflow-x-auto">
              <table className="w-full mb-10 overflow-hidden rounded-md table-auto">
                <thead className="text-white bg-blue-600">
                  <tr>
                    <th className="py-2 border border-white">Site</th>
                    <th className="py-2 border border-white">Username</th>
                    <th className="py-2 border border-white">Passwords</th>
                    <th className="py-2 border border-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-purple-200">
                  {passwordArray.filter(item =>
                    item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.username.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((item, index) => {
                    return <tr key={index}>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank" >{item.site}</a>
                          <div className="cursor-pointer lordiconcopy size-7" onClick={() => { copyText(item.site) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover">
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">{item.username}
                          <div className="cursor-pointer lordiconcopy size-7" onClick={() => { copyText(item.username) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover">
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">{item.password}
                          <div className="cursor-pointer lordiconcopy size-7" onClick={() => { copyText(item.password) }}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover">
                            </lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 text-center border border-white">
                        <span className="mx-1 cursor-pointer " onClick={() => { editPassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                          >
                          </lord-icon> </span>
                        <span className="mx-1 cursor-pointer" onClick={() => { deletePassword(item.id) }}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}
                          >
                          </lord-icon> </span>
                      </td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>}
        </div>
      </div>
    </>
  );
};

export default Manager