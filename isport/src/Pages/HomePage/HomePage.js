import React, { useEffect, useState } from 'react'
import './HomePage.css'
import football from '../../img/football.png'
import axios from 'axios'
import Nav from '../../Components/Nav/Nav'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const [allMatch, setAllMatch] = useState([])
    const [date, setDate] = useState(new Date())
    const [active, setActive] = useState(0)

    const handleClick = (dat, index) => {
        setDate(dat)
        setActive(index)
    }

    // navigation
    const navigate = useNavigate()

    let dateArray = []
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dateArray.push(date)
        // console.log(date.toLocaleDateString());
    }


    //tournament fetching
    useEffect(() => {
        const playData = async () => {
            const { data } = await axios.get('http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1')
            setAllMatch(data)
        }
        playData()
    }, [])


    //date item finding
    const dayList = allMatch.filter((item) => {
        return new Date(item.MatchDate).toLocaleDateString() === date.toLocaleDateString()
    })



    // group country wise
    const countryGroup = dayList.reduce((group, product) => {
        const { Country } = product;
        group[Country] = group[Country] ?? [];
        group[Country].push(product);
        return group;
    }, {});

    // convert to array
    const convertArray = Object.entries(countryGroup)

    // match id getting
    const matchId = (id) => {

        navigate(`/bet/${id}`)
    }





    return (
        <>
            <div className='main'>
                {/* Navbar area */}
                <Nav />
                {/* date area */}
                <div className="date">
                    {
                        dateArray.map((day, i) => {
                            return (
                                <>
                                    <div className={active === i ? " day active" : "day"}>
                                        <p onClick={() => handleClick(day, i)}>{day.toDateString()}</p>
                                    </div>
                                </>
                            )
                        })
                    }


                </div>

                {/* match area */}
                <div className="match">
                    <div className="head">
                        <img src={football} style={{ width: "25px", height: "25px" }} alt="" />
                        <span>Foot Ball</span>
                    </div>

                    {/*match table area */}

                    <div className="table">
                        {
                            convertArray.map((item) => {
                                return (
                                    <>
                                        <div className="country">
                                            <p>{item[0]}</p><p>ileague</p>
                                        </div>
                                        {item[1].map((i) => {
                                            const time = new Date(i.MatchDate).toLocaleTimeString()

                                            return (
                                                <>
                                                    <div className="play" onClick={() => matchId(i.MatchId)}>
                                                        <p style={{ margin: "10px" }}>{i.Team1Name}</p>
                                                        <p>{time}</p>
                                                        <p style={{ margin: "10px" }}>{i.Team2Name}</p>
                                                    </div>
                                                    <hr />
                                                </>

                                            )
                                        })}
                                    </>

                                )
                            })
                        }

                    </div>
                </div>
            </div>



        </>
    )
}

export default HomePage




