import React, { useState, useEffect } from "react";
import axios from "axios";
import './verrify.css'


const VerifyUser = ({ dataRegisterArr }) => {

    const [timeLeft, setTimeLeft] = useState(120); // 180 giây = 3 phút
    const [code, setCode] = useState(["", "", "", ""]);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [otp, setOtp] = useState(null);
    const [statusMessage, setStatusMessage] = useState(""); // Thêm trạng thái thông báo cho kết quả

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            // Dọn dẹp bộ đếm thời gian khi component unmount
            return () => clearInterval(timer);
        } else {
            setResendDisabled(true);
        }
    }, [timeLeft]);

    const handleInputChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value.slice(-1); // Chỉ cho phép 1 ký tự
        setCode(newCode);

        // Tự động chuyển sang ô tiếp theo
        if (value && index < 3) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput && nextInput.focus();
        }
    };

    const handleResendCode = () => {
        setTimeLeft(120);
        setResendDisabled(false);
        alert("Mã xác thực mới đã được gửi!");
    };

    // Chuyển đổi thời gian sang định dạng phút:giây
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setOtp(Number(code.join("")));
    // }

    // Xử lý xác thực OTP
    const saveAccount = async (data) => { // Thêm async
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/authentication/register/save', {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                birthday: data.birthday,
                pass_word: data.pass_word,
                user_name: data.user_name,
            });
            console.log('Tài khoản đã được lưu thành công:', res.data); // Ghi log nếu cần
            return true; // Trả về trạng thái thành công
        } catch (error) {
            console.error('Lỗi khi lưu tài khoản:', error); // Ghi log lỗi
            return false; // Trả về trạng thái thất bại
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = String(code.join("")); // Lấy OTP từ mã nhập
        setOtp(otp);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/authentication/register/status', {
                email: dataRegisterArr?.email || '', // Kiểm tra email trước khi gửi
                otp: otp,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );


            if (response.status === 200) {
                setStatusMessage("Xác thực thành công!");

                // Lưu tài khoản sau khi OTP xác thực thành công
                const isAccountSaved = await saveAccount(dataRegisterArr);

                if (isAccountSaved) {
                    console.log("Tài khoản đã được lưu thành công!");
                } else {
                    setStatusMessage("Xác thực thành công nhưng lưu tài khoản thất bại. Vui lòng thử lại.");
                }
            } else {
                setStatusMessage("Xác thực thất bại. Vui lòng kiểm tra mã OTP.");
            }
        } catch (error) {
            setStatusMessage("Đã xảy ra lỗi trong quá trình xác thực.");
            // console.error('Error in handleSubmit:', error); // Ghi log lỗi xác thực
            // Kiểm tra phản hồi lỗi và trích xuất thông báo
            const errorMessage = error.response?.data?.error || "Đã xảy ra lỗi không xác định.";

            // Xử lý phần chi tiết lỗi
            const errorDetailsObject = error.response?.data?.details;
            let errorDetails = "";

            if (errorDetailsObject) {
                // Biến đổi đối tượng details thành chuỗi
                errorDetails = Object.entries(errorDetailsObject)
                    .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                    .join("\n");
            }

            // Hiển thị lỗi trong alert
            window.alert(`Lỗi: ${errorMessage}\nChi tiết:\n${errorDetails}`);

        }
    };


    useEffect(() => {
        if (otp) {
            console.log("Updated otp:", otp);
        }
    }, [otp]);

    return (

        <div className='verify-container'>
            <h1>Mã xác thực</h1>
            <p>Mã xác thực đã được gửi đến email của bạn</p>
            <div className="code-input-container">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleInputChange(e.target.value, index)}
                        className="code-input"
                    />
                ))}
            </div>
            <p>Quá trình xác thực kết thúc sau : <span className="timer">{formatTime(timeLeft)}</span></p>
            {resendDisabled && (
                <p style={{ margin: '8px 0px', color: '#2E90FA', cursor: 'pointer' }} onClick={handleResendCode}>Gửi lại mã xác thực</p>
            )}
            <button className="verify-btn" onClick={handleSubmit}>Xác nhận</button>
        </div>
    );
};

export default VerifyUser;