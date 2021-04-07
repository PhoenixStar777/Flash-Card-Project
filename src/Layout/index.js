import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./common/Header";
import NotFound from "./common/NotFound";
import DeckList from "./decks/DeckList";
import EditDeck from "./decks/EditDeck";
import CreateDeck from "./decks/CreateDeck";
import DeckView from "./decks/DeckView";
import Study from "./cards/Study";
import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCard";
import "./Styles.css";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          {/* TODO: Implement the screen starting here */}
          <Route path="/" exact={true}>
            <DeckList />
          </Route>
          <Route path="/decks/:deckId/study" exact={true}>
            <Study />
          </Route>
          <Route path="/decks/new" exact={true}>
              <CreateDeck />
          </Route> 
          <Route path="/decks/:deckId" exact={true}>
            <DeckView />
          </Route>
          <Route path="/decks/:deckId/edit" exact={true}>
            <EditDeck />
          </Route>          
          <Route path="/decks/:deckId/cards/new" exact={true}>
            <AddCard /> 
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit" exact={true}>
          <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
