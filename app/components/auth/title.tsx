interface LayoutProps {
    title: string;
  }
  
  const Title: React.FC<LayoutProps> = ({ title }) => {
          return (
              <>
                  <div className="nk-block-head">
                    <div className="nk-block-head-content">
                      <h5 className="nk-block-title">{title}</h5>
                      <div className="nk-block-des"></div>
                    </div>
                  </div>
              </>
          )
}
  
export default Title;