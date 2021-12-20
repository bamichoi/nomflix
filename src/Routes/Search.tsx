import { searchMovie, searchTv, IGetMoviesResult } from " api";
import { useLocation } from "react-router";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import  { useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom";

const Wrapper = styled.div`
    background-color:black;
`;

const Loader = styled.div`
    height:20vh;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Slider = styled.div`
  &.slider_0 {
    margin-top:100px;
}
  &.slider_1 {
    margin-top:200px;
  }
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
  height: 150px;
  font-size: 66px;
  cursor: pointer;
   &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Payload = styled(motion.div)`
    opacity:0;
    padding: 5px;
    width:100%;
    background-color: ${props => props.theme.black.lighter};
    position:absolute;
    bottom:0;
    h4 {
        text-align:center;
        font-size:10px;
    }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieCard = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const CardCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const CardTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 40px;
  position: relative;
  top: -80px;
  font-weight:400;
`;

const CardOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const CategoryTitle = styled.h2`
  padding:10px;
  margin-left:10px;
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

const boxVariants = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.3,
      y: -10,
      transition: {
        delay: 0.5,
        duaration: 0.3,
        type: "tween",
      },
    },
  };

const payloadVariants = {
    hover : {
        opacity:1,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: "tween",
          },
    }
}

const offset = 6;

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const {data : movieData, isLoading : movieLoading} = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], () => searchMovie(keyword));
    const {data : tvData, isLoading : tvLoading } = useQuery<IGetMoviesResult>(["movies", "topRated"], () => searchTv(keyword));
    const data = [movieData, tvData]
    const isLoading = ( movieLoading && tvLoading);
    const [category, setCategory] = useState(0);
    const currentData = data[category]
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const history = useHistory();
    const objectMatch = useRouteMatch<{ objectId: string }>(`/search/:objectId`);
    const { scrollY } = useViewportScroll();
    const clickedMovie = objectMatch?.params.objectId && currentData?.results.find((object) => object.id === +objectMatch.params.objectId);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const onClicked = (objectId: number, category:number) => {
        history.push(`/search/${objectId}`);
        setCategory(category)
      };
    const onClickedOverlay = () => history.push(`/search?keyword=${keyword}`);
    const nextIndex = () => {
        if (currentData) {
            if (leaving) return;    
            toggleLeaving();
            const totalObjects = currentData?.results.length - 1;
            const maxIndex = Math.floor(totalObjects / offset);
            console.log(index, maxIndex);
            setIndex((prev) =>(prev === maxIndex ? 0 : prev + 1));
        }
    }
    return (
        <Wrapper onClick={nextIndex} >
            
             {isLoading ? <Loader>Loading</Loader> : 
            <>
                 {[0, 1].map( i => ( 
               <>
                <Slider className={`slider_${i}`}>
                  <CategoryTitle>
                    {i === 0 ? "Movies" : "TV Shows" }
                  </CategoryTitle>
                <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
                    <Row variants={rowVariants} initial="hidden" animate="visible" exit="exit" transition={{ type: "tween", duration: 1 }} key={index}>
                    {data[i]?.results.slice(1).slice(offset * index, offset * index + offset).map((object) => (
                        <Box key={object.id} bgPhoto={makeImagePath(object.backdrop_path, "w500")}
                        whileHover="hover"
                        initial="normal"
                        layoutId={`${i}_${object.id}`}
                        variants={boxVariants}
                        onClick={() => onClicked(object.id, i)}
                        >
                            <Payload variants={payloadVariants}>
                                <h4>{object.title}</h4>
                            </Payload>
                        </Box>
                        ))}
                    </Row>
                    </AnimatePresence>
                </Slider>
                </>))}
                <AnimatePresence>
                    {objectMatch ? (
                    <>
                     <Overlay onClick={onClickedOverlay} animate={{opacity: 1}} exit={{opacity: 0}}>
                     </Overlay>
                    <MovieCard
                        style={{ top: scrollY.get() + 100 }}
                        layoutId={objectMatch.params.objectId}>
                        {clickedMovie && (
                        <>
                        <CardCover
                            style={{backgroundImage: `linear-gradient(to top, black, transparent), 
                            url(${makeImagePath(clickedMovie.backdrop_path,"w500")})`}}>
                        </CardCover>
                        <CardTitle>{clickedMovie.title}</CardTitle>
                        <CardOverview>{clickedMovie.overview}</CardOverview>
                        </>
                        )}
                    </MovieCard> 
                    </>
                    ) : null}
                </AnimatePresence>
            </>}
        </Wrapper>
    );
}

export default Search;