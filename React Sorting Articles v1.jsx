/*
Sorting Articles App:
- Displays articles from a prop array.
- Articles: { title (STRING), upvotes (NUMBER), date (YYYY-MM-DD STRING) }.
- Default display: Ordered by upvotes descending.
- "Most Upvoted" button: Sorts articles by upvotes descending.
- "Most Recent" button: Sorts articles by date descending.
- Unique publish date and upvote count assumed.
- Implement: src/App.js & src/components/Articles.js.
- Data-testid attributes for testing:
  - Buttons: "most-upvoted-link", "most-recent-link".
  - Article row: "article".
  - Article elements: "article-title", "article-upvotes", "article-date".
Note: Don't alter provided data-testid attributes.
*/
import React, { useState } from "react";
import "./App.css";
import "h8k-components";

import Articles from "./components/Articles";

const title = "Sorting Articles";

export function App({ articles }) {
  const [sortedArticles, setSortedArticles] = useState([...articles].sort((a, b) => b.upvotes - a.upvotes));
  const [sortBy, setSortBy] = useState("upvotes"); // default upvotes descending

  const onMostUpvotedSort = () => {
    /**
     * we make sure to sort a copy of sortedArticles since we don't want to mutate the original state
     * we compare (b - a) since we want b(most) to a(least) order aka descending order
     */
    const newSortedArticles = [...sortedArticles].sort((a, b) => b.upvotes - a.upvotes);
    setSortBy("upvotes");
    setSortedArticles(newSortedArticles);
  };

  const onMostRecentSort = () => {
    /**
     * we make sure to sort a copy of sortedArticles since we don't want to mutate the original state
     * we do new Date to use the date string and compare (b - a) since we want a b(newest) to a(oldest) order
     * descending aka order
     */
    const newSortedArticles = [...sortedArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortBy("recent");
    setSortedArticles(newSortedArticles);
  };

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row align-items-center justify-content-center my-20 navigation">
        <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
        <button data-testid="most-upvoted-link" className="small" onClick={onMostUpvotedSort}>
          Most Upvoted
        </button>
        <button data-testid="most-recent-link" className="small" onClick={onMostRecentSort}>
          Most Recent
        </button>
      </div>
      <Articles articles={sortedArticles} />
    </div>
  );
}

export function Articles({ articles }) {
  console.log({ articles });
  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => {
            const { title, date, upvotes } = article;
            return (
              <tr data-testid="article" key="article-index">
                <td data-testid="article-title">{title}</td>
                <td data-testid="article-upvotes">{upvotes}</td>
                <td data-testid="article-date">{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
