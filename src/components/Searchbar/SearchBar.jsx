import { useState } from "react";
import { Header, SearchButton, SearchForm, SearchInput } from "./Searchbar.styled";
import { SlMagnifier } from "react-icons/sl";
import { Notify } from "notiflix";
import { paramsForNotify } from "components/Notify/Notify";


const SearchBar = ({onSubmit}) => {
    const [textQuery, setTextQuery] = useState('');

        // зміни в інпуті
        const onChangeInput = (event) => {
            setTextQuery(event.currentTarget.value.toLowerCase().trim())
        }; 
        
        const handleSubmit = e => {
            e.preventDefault();
            // const { textQuery } = this.state;
            // console.log(textQuery);
            // const { onSubmit } = this.props;

            // повідомлення
            if (textQuery === '') {
                Notify.info('Enter your request, please!', paramsForNotify);
                return;
            }
            //фун-я onSubmit прийшла з App через пропси
            onSubmit(textQuery);
    
            //очистка рядка пошука
            setTextQuery('');
        };

            return(
                <Header>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchButton  type="submit">
                        <SlMagnifier />
                    </SearchButton>
                    <SearchInput
                     value = {textQuery}
                     onChange = {onChangeInput}
                     type="text"
                     name="search"
                     autoComplete="off"
                     autoFocus
                     placeholder="Search images and photos"
                   />
                </SearchForm>
            </Header>
            )
        }

export default SearchBar;