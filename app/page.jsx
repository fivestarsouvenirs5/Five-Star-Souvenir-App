
export default function Home() {
  // var myHeaders = new Headers();
  // myHeaders.append("Accept", "application/json");

  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   redirect: 'follow'
  // };

  // fetch("https://login.auth0.com/api/v2/users", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  return (
    <main >
      {/* <h2 className="text-purple-600">Home</h2> */}

      
      {/* we are five star souvenirs (BOX NOT CENTERED) */}
      <div className="left-[50px] top-[40px] content-center w-[1195px] h-[143px] relative">
        <div className="w-[1195px] h-[143px] left-0 top-0 absolute border border-red-500" />
        <div className="left-[14px] top-[21px] absolute text-black text-[16px]">we are five star souvenirs inc</div>
      </div>

      {/* featured products */}
      <div className="left-[50px] top-[100px] content-center w-[1195px] h-[143px] relative">
        <div className="w-[1195px] h-[143px] left-0 top-0 absolute border border-red-500" />
        <div className="left-[14px] top-[21px] absolute text-black text-[16px]">Featured Products</div>
      </div>

    </main>
  )
}
