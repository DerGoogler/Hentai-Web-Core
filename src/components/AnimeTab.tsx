import { ViewX, ViewXRenderData, Page } from "react-onsenuix";

interface Props {
  content: JSX.Element;
}

class AnimeTab extends ViewX<Props> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);

    this.createView = this.createView.bind(this);
  }

  public createView(data: ViewXRenderData<Props, {}, HTMLElement>): JSX.Element {
    return (
      <Page>
        <section>
          <span>{data.p.content}</span>
        </section>
      </Page>
    );
  }
}

export default AnimeTab;
