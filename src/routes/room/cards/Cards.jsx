import { Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSelectedDeckCardsUrl, wsTargetUrl } from "../../../api/ApiUrls";

export default function Cards({ stompClient, roomId, loggedUserId, userName, deckId, active, currentCard, setCurrentCard }) {
  const [deckCards, setDeckCards] = useState({
    deckId: null,
    deckName: "",
    cardValues: [],
  });
  useEffect(() => {
    if (!deckId) return;
    axios
      .get(getSelectedDeckCardsUrl + "/" + deckId)
      .then((result) => {
        setDeckCards(result.data);
        console.log("deck: " + result.data.cardValues);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deckId]);

  const deck = deckCards.cardValues;

  const setCardVote = (card) => {
    if (active) {
      stompClient.send(wsTargetUrl + "/vote/" + roomId, {}, JSON.stringify({ userId: loggedUserId, userName: userName, value: card }));
      setCurrentCard(card);
    }
  };
  return (
    <Box className="room-card-container">
      {deck.map((card) => (
        <Card
          key={card}
          className={`${active ? "room-card-active" : "room-card-inactive"} ${card === currentCard ? "room-card-selected" : ""}`}
          onClick={() => setCardVote(card)}
        >
          <CardContent className="room-card-content">{card}</CardContent>
        </Card>
      ))}
    </Box>
  );
}
