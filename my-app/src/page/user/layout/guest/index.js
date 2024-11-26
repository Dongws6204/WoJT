import { memo } from 'react'


const Guest = ({ children }) => {
    return (

        <div >
            <main >
                {children}
            </main>
        </div>
    );
};


export default memo(Guest);