import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import AccountList from "../../components/home/AccountList";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>Acc Info</Header>
      </div>
      <div className="container mt-[80px]">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full md:w-4/12 p-6">
            <AccountList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
