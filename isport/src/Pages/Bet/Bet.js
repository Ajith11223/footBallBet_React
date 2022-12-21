import React, { useEffect, useState } from 'react'
import Nav from '../../Components/Nav/Nav'
import './bet.css'
import back from '../../img/back.png'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Bet = () => {

  const navigate = useNavigate()

  const [allData, setAllData] = useState([])
  const [date, SetDate] = useState()
  const [leg, setLeg] = useState([])
  const [market, setMarket] = useState([])


  //selected market id and leg id
  const [marketId, setMarketId] = useState()
  const [legId, setLegId] = useState()

  //bet result
  const [bet, setBet] = useState({})




  //navigate home page
  const handleClick = () => {
    navigate("/")
  }

  //match id get using useParams
  const { id } = useParams()


  //fetching match detail
  useEffect(() => {
    const allData = async () => {
      const { data } = await axios.get("http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1")
      setAllData(data)
    }
    allData()
  }, [])

  const match = allData.filter((item) => {
    return item.MatchId === id
  })

  // leg list fetching

  useEffect(() => {

    //legs
    const allLegs = async () => {
      const { data } = await axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1')
      setLeg(data)
    }
    //market list
    const allMarket = async () => {
      const { data } = await axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1')
      setMarket(data)
    }

    allLegs()  // call legs
    allMarket() //call market

  }, [])

  const click = (marketId) => {
    setMarketId(marketId.target.value)
  }

  const click1 = (legId) => {
    setLegId(legId.target.value)
  }



  //get betApi call 
  useEffect(() => {
    const betApi = async () => {
      const { data } = await axios.get(`http://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=${id}&marketId=${marketId}&legs=${legId}&language=en`)
      setBet(data)
    }
    betApi()
  }, [marketId, legId])

  // get market value
  let MarketName = market.filter((item) => {
    let marketValue = item.MarketId === marketId
    return marketValue
  })






  return (
    <>
      <div className="bet">
        <Nav />
        <div className="back">
          <img src={back} alt="" onChange={() => handleClick()} style={{ width: "35px", height: "35px" }} />
        </div>

        <div className="head1">
          <h1>Make It A Bet Builder?</h1>
        </div>

        <div className="gap">
        </div>

        {/* match detail */}
        {
          match.map((item) => {
            let d = new Date(item.MatchDate)
            return (

              <div className="match1">
                <h2>{d.toUTCString()}</h2>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                  <h2>{item.MatchName}</h2>
                  <span>{item.Country} - <span>{item.LeagueName}</span></span>
                </div>
              </div>
            )
          })
        }


        {/* // selection area */}
        <div className='selection'>
          <span>Select Market list :</span>
          <select className='opt' onChange={click}>
            <option   >Select</option>
            {
              market.map((item) => {
                let nam = item.MarketName
                let id = item.MarketId
                return (
                  <>
                    <option value={id}  >{nam}</option>
                  </>
                )
              })
            }
          </select>

          {/* leg details */}

          <span>Legs      :</span>
          <select className='opt' onChange={click1}>
            <option   >Select</option>
            {
              leg.map((item) => {
                let nam = item.selectionValue
                let id = item.selectionId
                return (
                  <>
                    <option value={id} >{nam}</option>
                  </>
                )
              })
            }
          </select>
        </div>

        {/* output table  */}

        <div className="result">
          <h2 style={{ padding: "20px" }}>Bet Builders Odds :<span style={{ color: "red" }}>{bet.TotalOdds}</span> </h2>

          <table style={{ width: "100%" }} className="r">
            <tr>
              <th>Key Stats</th>
              <th>Market</th>
              <th>Outcome</th>
            </tr>
            <tr>
              {
                MarketName.map((item) => {
                  let v = item.MarketName.split("-")[0]
                  let vv = item.MarketName.split("-")[1]
                  return (
                    <>
                      <td>Brontfort have drawn the first half  </td>
                      <td>{v}</td>
                      <td>{vv}</td>

                    </>
                  )
                })
              }

            </tr>

          </table>
        </div>


      </div>

    </>
  )
}

export default Bet