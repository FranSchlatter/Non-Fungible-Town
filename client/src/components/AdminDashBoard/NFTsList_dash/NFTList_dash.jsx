import React, { useState } from "react";
import { useEffect } from "react";
import "./NFTList_dash.css";

// Components
import NFTsCard_dash from "../NFTsCard_dash/NFTsCard_dash";
import UserCard_dash from "../UserCard_dash/UserCard_dash";
import VUserCard_dash from "../VUserCard_dash/VUserCard_dash";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const NFTList_dash = ({ users, nfts, verifyingUsers }) => {
  // const { nfts } = useSelector((state) => state);
  // const dispatch = useDispatch();

  const [cp, setCp] = useState(0);
  const [nftsxPage, setNFTsxPage] = useState(10);
  const [displayNFTs, setDisplayNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  // useEffect(() => {
  //   dispatch(actions.getAllNfts());
  // }, [dispatch]);

  useEffect(() => {
    setDisplayNFTs(
      filteredNFTs.slice(cp * nftsxPage, cp * nftsxPage + nftsxPage)
    );
  }, [filteredNFTs, cp, nftsxPage]);

  useEffect(() => {
    if (users) {
      setFilteredNFTs(users);
    } else if (verifyingUsers) {
      setFilteredNFTs(verifyingUsers);
    } else {
      setFilteredNFTs(nfts);
    }
  }, [nfts, users, verifyingUsers]);

  const search = (e) => {
    if (users) {
      let nftsxName = users.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (cp !== 0) setCp(0);
      setFilteredNFTs(nftsxName);
    } else if (verifyingUsers) {
      let nftsxName = verifyingUsers.filter((user) =>
        `${user.name} ${user.last_name}`
          .toLocaleLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      if (cp !== 0) setCp(0);
      setFilteredNFTs(nftsxName);
    } else {
      let nftsxName = nfts.filter((nft) =>
        nft.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (cp !== 0) setCp(0);
      setFilteredNFTs(nftsxName);
    }
  };

  const handleShowChange = (e) => {
    setNFTsxPage(Number(e.target.value));
    setCp(0);
  };

  const incrementCp = (e) => {
    e.preventDefault();
    setCp(cp + 1);
  };

  const decrementCp = (e) => {
    e.preventDefault();
    setCp(cp - 1);
  };

  // if (!nfts.length) return <h1>Loading</h1>;
  return (
    <div className="nfts-dash-container">
      <div className="nft-dash-search-container">
        <label htmlFor="">
          Search by name:
          <input onChange={search} type="text" />
        </label>
        <p>
          Showing {nftsxPage} out of {filteredNFTs.length}
        </p>
        <div className="nft-dash-show-container">
          <label htmlFor="nftsxPage">Show: </label>
          <select onChange={handleShowChange} name="nftsxPage">
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <button onClick={decrementCp} disabled={cp == 0}>
            <ArrowBackIosIcon />
          </button>
          <button
            onClick={incrementCp}
            disabled={cp * nftsxPage + nftsxPage >= filteredNFTs.length}
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      {/* Conditional Div (nft/user) */}
      {users ? (
        <div className="dash-nfts-titles">
          <div className="dash-users-NameTitle">
            <p>Username</p>
          </div>
          <div className="dash-users-EmailTitle">
            <p>email</p>
          </div>
          <div className="dash-users-TypeTitle">
            <p>Type</p>
          </div>
        </div>
      ) : verifyingUsers ? (
        <div className="dash-nfts-titles">
          <div className="dash-vUsers-fn">
            <p>Full Name</p>
          </div>
          <div className="dash-vUsers-dni">
            <p>DNI</p>
          </div>
          <div className="dash-vUsers-age">
            <p>Age</p>
          </div>
          <div className="dash-vUsers-pn">
            <p>PhoneNumber</p>
          </div>
          <div className="dash-vUsers-nc">
            <p>Nacionality</p>
          </div>
          <div className="dash-vUsers-pps">
            <p>User Pictures</p>
          </div>
        </div>
      ) : (
        <div className="dash-nfts-titles">
          <div className="dash-nfts-NameTitle">
            <p>Name</p>
          </div>
          <div className="dash-nfts-PriceTitle">
            <p>Price</p>
          </div>
          <div className="dash-nfts-UserIdTitle">
            <p>UserId</p>
          </div>
        </div>
      )}

      {/* Conditional Div (nft/user) */}
      {/* Conditional Div (nft/user) */}
      {users ? (
        <div className="dash-nfts-list">
          {displayNFTs.map((user) => (
            <UserCard_dash
              id={user.id}
              username={user.username}
              email={user.email}
              type={user.type}
              deletedAt={user.deletedAt || null}
            />
          ))}
        </div>
      ) : verifyingUsers ? (
        <div className="dash-nfts-list">
          {displayNFTs.map((user) => (
            <VUserCard_dash
              id={user.id}
              name={user.name}
              last_name={user.last_name}
              dni={user.dni}
              age={user.age}
              phoneNumber={user.phone_number}
              nacionality={user.nationality}
              pp1={user.face_picture}
              pp2={user.dni_image_back}
              pp3={user.dni_image_front}
            />
          ))}
        </div>
      ) : (
        <div className="dash-nfts-list">
          {displayNFTs.map((nft) => (
            <NFTsCard_dash
              key={nft.id}
              id={nft.id}
              name={nft.name}
              price={nft.price}
              userId={nft.userId || "null"}
              deletedAt={nft.deletedAt || null}
            />
          ))}
        </div>
      )}
      {/* Conditional Div (nft/user) */}
    </div>
  );
};

export default NFTList_dash;
