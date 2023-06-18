import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getDeckCardsUrl } from "./../../../api/ApiUrls";
import "./../styles/RoomListStyles.css";

export default function SelectCardDeck({ deckId, handleSelectDeck, variant }) {
  const [cardDecks, setCardDecks] = useState([]);

  useEffect(() => {
    if (cardDecks.length === 0) {
      axios
        .get(getDeckCardsUrl)
        .then((response) => {
          if (response.status === 200) {
            setCardDecks(response.data);
          } else {
            console.log(response);
            // Handles error response
            if (response.data.message) {
              console.log(response.data.message);
            } else {
              console.log("An error occurred.");
            }
          }
        })
        .catch((error) => {
          console.error("Error getting card data:", error);
        });
    }
  }, [deckId, cardDecks]);

  //Defines how each item would look like in drop down
  const selectDecks = cardDecks.map((selectDeck) => {
    return (
      <MenuItem key={selectDeck.deckId} value={selectDeck.deckId.toString()}>
        {`${selectDeck.deckName} (${selectDeck.cardValues})`}
      </MenuItem>
    );
  });
  return (
    <FormControl
      variant={variant}
      size="normal"
      className="select-card-deck-field"
    >
      <InputLabel id="cardDeckLabel">Selected deck *</InputLabel>
      <Select
        className="select-card-deck"
        labelId="cardDeckLabel"
        name="deckId"
        variant={variant}
        id="deckId"
        label="Selected deck *"
        value={deckId}
        onChange={(e) => handleSelectDeck(e)}
        required
      >
        {selectDecks}
      </Select>
    </FormControl>
  );
}
