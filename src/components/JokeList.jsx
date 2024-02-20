import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import Alert from "./Alert";
import Joke from "./Joke";
import Toolbar from "./Toolbar";

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [alertContent, setAlertContent] = useState("");
  const [selectedJokeIds, setSelectedJokeIds] = useState([]);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isFetchDisabled, setIsFetchDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [curPage, setCurPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const onFetchJokes = () => {
    setIsLoading(true);
    fetch(`https://icanhazdadjoke.com/search?limit=5&page=${curPage + 1}`, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setJokes([...response.results, ...jokes]);
        setTotalPages(response.total_pages);
        setSelectedJokeIds([]);
        setCurPage(curPage + 1);
      })
      .catch((err) => {
        console.log(err);
        setAlertContent(
          "Houston we have a problem! Something went wrong with the API call."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onDeleteClicked = (targetId) => {
    setJokes(jokes.filter((joke) => joke.id !== targetId));
    setSelectedJokeIds(selectedJokeIds.filter((id) => id !== targetId));
  };

  const onDeleteSelectedClicked = () => {
    setJokes(
      jokes.filter((joke) => {
        let shouldKeep = true;
        selectedJokeIds.forEach((id) => {
          if (id === joke.id) {
            shouldKeep = false;
          }
        });
        return shouldKeep;
      })
    );
    setSelectedJokeIds([]);
  };

  const onFetchMoreClicked = () => {
    onFetchJokes();
  };

  const onSelectClicked = (targetId, checked) => {
    let newSelection = cloneDeep(selectedJokeIds);
    if (checked) {
      newSelection.push(targetId);
    } else {
      newSelection = newSelection.filter((curId) => curId != targetId);
    }
    setSelectedJokeIds(newSelection);
  };

  useEffect(() => {
    let unsubscribed = false;
    if (!unsubscribed) {
      onFetchJokes();
    }
    return () => (unsubscribed = true);
  }, []);

  useEffect(() => {
    setIsDeleteDisabled(selectedJokeIds.length < 1);
  }, [selectedJokeIds]);

  useEffect(() => {
    setIsFetchDisabled(curPage + 1 > totalPages);
    setAlertContent(
      curPage + 1 > totalPages ? "These are all of the jokes we have!" : ""
    );
  }, [curPage, totalPages]);

  return (
    <>
      <div className="row g-0 justify-content-center py-3">
        <div className="col-11 col-sm-10 col-md-7 col-lg-6">
          <Toolbar
            isDeleteDisabled={isDeleteDisabled}
            isFetchDisabled={isFetchDisabled}
            onDeleteSelectedClicked={onDeleteSelectedClicked}
            onFetchMoreClicked={onFetchMoreClicked}
            selectedJokeIds={selectedJokeIds}
          />
          {alertContent && <Alert>{alertContent}</Alert>}
          {!isLoading ? (
            <ul className="list-group">
              {jokes.map((joke) => (
                <Joke
                  id={joke.id}
                  key={joke.id}
                  joke={joke.joke}
                  onDeleteClicked={onDeleteClicked}
                  onSelectClicked={onSelectClicked}
                />
              ))}
            </ul>
          ) : (
            <div className="spinner-border m-5" role="status"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default JokeList;
