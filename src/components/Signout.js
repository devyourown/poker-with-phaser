import React from 'react';

function Signout() {
    const onClick = () => {
        localStorage.setItem("TOKEN", "");
        window.location.href = "/login";
    }
    return (
        <div>
            <button onClick={() => {onClick();}}>Sign out</button>
        </div>
    );
}

export default Signout;