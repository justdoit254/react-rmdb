// import React, {useState, useEffect, useRef} from "react";
import React, {Component} from "react";
import PropTypes from "prop-types"

// Image
import searchIcon from '../../images/search-icon.svg';

// styles
import { Wrapper, Content } from "./SearchBar.styles";

class SearchBar extends Component {
   
    state = {value: ''}
    timeout = null

    componentDidUpdate(_prevProps, prevState) {
        if(this.state.value !== prevState.value) {
            const {setSearchTerm} = this.props
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                const{value} = this.state
                setSearchTerm(value);
            }, 500)
        }
    }

   render() {
        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search movie" 
                        onChange={event => this.setState({value: event.currentTarget.value})}
                        value={this.state.value}
                    />
                </Content>
            </Wrapper>
        )
    }
    
}

// const SearchBar = ({setSearchTerm}) => {
//     const [state, setState] = useState('');

//     const initial = useRef(true)

//     useEffect(() => {
//         if (initial.current) {      //to skip the initial rerender
//             initial.current = false;
//             return
//         }
//         const timer = setTimeout(() => {
//             setSearchTerm(state);
//         }, 500)

//         return () => clearTimeout(timer)
//     }, [setSearchTerm, state])

//     return (
//         <Wrapper>
//             <Content>
//                 <img src={searchIcon} alt="search-icon" />
//                 <input 
//                     type="text" 
//                     placeholder="Search movie" 
//                     onChange={event => setState(event.currentTarget.value)}
//                     value={state}
//                 />
//             </Content>
//         </Wrapper>
//     )
// }

// SearchBar.propTypes = {
//     setSearchTerm: PropTypes.func
// }

export default SearchBar;