import React, { useEffect, useState, useCallback } from "react";
import { publicGistsRecord } from "../../utils/fetchAPIs";
import TableData from "../common/table/TableData";
import GridDisplay from "../common/grid/Grid";
import Loader from "../common/spinner/Spinner";
import { Section, Div, SpanBorder } from "./style";

const PublicGists = () => {
  const [publicGistsList, setPublicGistsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
  const [layout, setLayout] = useState("list");

  const listLayout =
    layout === "list" ? "fas fa-list fa-2x list-active" : "fas fa-list fa-2x";
  const gridLayout =
    layout === "grid"
      ? "fas fa-th-large fa-2x grid-active"
      : "fas fa-th-large fa-2x";

  const view = loading ? (
    <Loader />
  ) : isListView === true ? (
    <TableData publicGistsDisplay={publicGistsList} />
  ) : (
    <GridDisplay publicGistsDisplay={publicGistsList} />
  );

  const getPublicGists = useCallback(async () => {
    setLoading(true);
    let resp = await publicGistsRecord();
    setLoading(false);
    setPublicGistsList(resp);
  }, [publicGistsRecord]);

  const listToggle = useCallback(() => {
    setIsListView(true);
    setIsGridView(false);
    setLayout("list");
  }, [isGridView, isListView, layout]);

  const gridToggle = useCallback(() => {
    setIsListView(false);
    setIsGridView(true);
    setLayout("grid");
  }, [isGridView, isListView, layout]);

  useEffect(() => {
    getPublicGists();
  }, []);

  return (
    <Section>
      <Div>
        <span>
          <i className={listLayout} onClick={listToggle} />
        </span>
        <SpanBorder></SpanBorder>
        <span>
          <i className={gridLayout} onClick={gridToggle} />
        </span>
      </Div>
      {view}
    </Section>
  );
};

export default PublicGists;