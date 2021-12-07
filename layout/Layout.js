import Navbar from '../components/nav/dashboard-navbar'


function Layout({ children, headerName, metamaskAddress }) {

    
return (
    <>
        <Navbar
            headerName={headerName}
        />
        
        <main>{ children }</main>

        {/* footer? */}
    </>
)

}

export default Layout;