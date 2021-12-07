import Navbar from '../components/nav/dashboard-navbar'


function Layout({ children, headerName, metamaskAddress, session }) {

return (
    <>
        <Navbar
            headerName={headerName}
            session={session}
        />
        
        <main>{ children }</main>

        {/* footer? */}
    </>
)

}

export default Layout;