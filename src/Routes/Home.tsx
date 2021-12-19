import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from " api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence } from "framer-motion";
import  { useState } from "react"


const Wrapper = styled.div`
    background-color:black;
`;

const Loader = styled.div`
    height:20vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Banner = styled.div<{ bgPhoto: string}>`
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${props => props.bgPhoto});
    background-size:cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom:20px;
`;

const Overview = styled.p`
    font-size: 20px;
    width:50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto:string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  font-size: 66px;
`;

const rowVariants = {
    hidden: {
      x: window.outerWidth + 10,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 10,
    },
  };

const offset = 6;

function Home() {
    const {data, isLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const nextIndex = () => {
        if (data) {
            console.log(leaving)
            if (leaving) return;    
            toggleLeaving();
            const totalMovie = data.results.length - 1;
            const maxIndex = Math.floor(totalMovie / offset);
            console.log(index, maxIndex);
            setIndex((prev) =>(prev === maxIndex ? 0 : prev + 1));
        }
    } 
    return (
        <Wrapper>
            {isLoading ? <Loader>Loading</Loader> : 
            <>
                <Banner onClick={nextIndex} bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
                    <Title>{data?.results[0].title}</Title>
                    <Overview>{data?.results[0].overview}</Overview>
                </Banner>
                <Slider>
                <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
                    <Row  variants={rowVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={index}>
                    {data?.results.slice(1).slice(offset * index, offset * index + offset).map((movie) => (
                        <Box key={movie.id} bgPhoto={makeImagePath(movie.backdrop_path, "w500")}></Box>
                        ))}
                    </Row>
                    </AnimatePresence>
                </Slider>
            </>
            }
        </Wrapper>
 
    );
}

export default Home;