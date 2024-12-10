import React, { useContext } from 'react';
import AdminNav from '../../../admin/nav/AdminNav';
import { AuthContext } from "../../../ContextAPI/AuthContext";

const AdminLayout = ({ children }) => {

    const { authState } = useContext(AuthContext);
    
    if (authState.role !== 2) {
        return null;
    }

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ flex: '0 0 21%' }}>
                <AdminNav />
            </div>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '26px 36px' }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;