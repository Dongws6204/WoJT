import React, { useState } from 'react';
import VerifyUser from '../../../components/VerifyUsers/VerifyUser';
import './changepass.css'

const ChangePassword = () => {

    const [dataPassChange, setDataPassChange] = useState(
        {
            pass_old: '',
            pass_new: '',
            repass_new: ''
        }
    );

    const [formError, setFormError] = useState({});
    const [isVerify, setIsVerify] = useState(false);

    const validateData = () => {
        const error = {};

        // Kiểm tra mật khẩu và nhập lại mật khẩu
        if (dataPassChange.pass_new !== dataPassChange.repass_new) {
            error.confimPassword = 'Mật khẩu không khớp';
        }

        setFormError(error)

        return Object.keys(error).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateData()) {
            setIsVerify(true)
            console.log("formdata", dataPassChange);
        }
        else {
            console.log(formError)
        }
    }

    const closeOtp = () => {
        setIsVerify(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataPassChange((data) => ({
            ...data,
            [name]: value
        }));
    };

    return (
        <>
            <div style={{ display: "block", padding: '8px' }}>
                <div style={{ width: '100%', height: 'auto', margin: '5px 0px' }}>
                    <p style={{ margin: '5px 0px', fontFamily: 'Montserrat', fontSize: '16px' }}>Nhập mật khẩu cũ :</p>
                    <input type="password" name='pass_old' onChange={handleChange} style={{ width: '100%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '8px', fontFamily: 'Montserrat' }} />
                </div>
                <div style={{ width: '100%', height: 'auto', margin: '5px 0px' }}>
                    <p style={{ margin: '5px 0px', fontFamily: 'Montserrat', fontSize: '16px' }}>Mật khẩu mới :</p>
                    <input type="password" name='pass_new' onChange={handleChange} style={{ width: '100%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '8px', fontFamily: 'Montserrat' }} />
                    {formError.confimPassword && (
                        <p className='error-feedback' style={{ marginRight: "169px" }}>{formError.confimPassword}</p>
                    )}
                </div>
                <div style={{ width: '100%', height: 'auto', margin: '5px 0px' }}>
                    <p style={{ margin: '5px 0px', fontFamily: 'Montserrat', fontSize: '16px' }}>Nhập lại mật khẩu mới :</p>
                    <input type="password" name='repass_new' onChange={handleChange} style={{ width: '100%', border: '1px solid black', margin: '5px 0px', minHeight: '36px', padding: '8px', fontFamily: 'Montserrat' }} />
                    {formError.confimPassword && (
                        <p className='error-feedback' style={{ marginRight: "169px" }}>{formError.confimPassword}</p>
                    )}
                </div>
                <button onClick={handleSubmit} className='changepass-btn'>Lưu thay đổi</button>
            </div>
            {isVerify && (
                <>
                <div
                    onClick={closeOtp}
                    style={{
                        position: "absolute",
                        zIndex: "10",
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(76, 79, 77, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        top: 0,
                        left: 0
                    }}>
                </div>
                <VerifyUser />
                </>
            )}
        </>
    );
};

export default ChangePassword;