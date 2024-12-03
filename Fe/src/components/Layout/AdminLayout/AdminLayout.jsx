import React from 'react';
import AdminNav from '../../../admin/nav/AdminNav';


const AdminLayout = ({ children }) => {

    return (
        <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
            <div style={{ flex: '0 0 21%' }}>
                <AdminNav/>
            </div>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', padding: '26px 36px' }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;