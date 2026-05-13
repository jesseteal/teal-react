import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SimpleCardActions from '../molecules/SimpleCardActions';
import SimpleTabs from './SimpleTabs';
import Icon from '../atoms/Icon';

/*
usage:
  import SimpleCard from 'components/Basic/SimpleCard';
  <SimpleCard
    header="Header"
    subheader="Sub Header"
  >
    <div>hello world</div>
  </SimpleCard>

  parameters:
    header: {string} - (optional)
    subheader: {string} - (optional)
    //todo:
    tabs: {array}
      - label
      - onClick
*/

const SimpleCard = (props?: any) => {
  const {
    header,
    subheader,
    children,
    actionsLeft,
    actionsRight,
    className,
    style,
    tabs,
  } = props || {};
  const Content: any = props.noGutter ? Box : CardContent;
  return (
    <Card className={className} style={style} raised={props.raised}>
      {(header || subheader) && (
        <>
          <CardHeader
            avatar={
              props.avatar ? (
                <IconButton size="small" onClick={props.avatar.onClick}>
                  <props.avatar.icon />
                </IconButton>
              ) : props.onBack ? (
                <IconButton size="small" onClick={props.onBack}>
                  <Icon.Left />
                </IconButton>
              ) : null
            }
            action={
              props.headeraction ? (
                <IconButton size="small" onClick={props.headeraction.onClick}>
                  {props.headeraction.icon}
                </IconButton>
              ) : null
            }
            subheader={subheader}
            title={header}
          />
          <Divider />
        </>
      )}
      {tabs && (
        <SimpleTabs
          tabs={tabs.map((t: any) => ({
            label: t.label,
          }))}
          onChange={(i: number) => {
            tabs[i].onClick();
          }}
        />
      )}

      {tabs && <Divider />}
      {children && <Content style={props.content_style}>{children}</Content>}
      {props.footer && <SimpleCardActions>{props.footer}</SimpleCardActions>}
      <SimpleCardActions actionsLeft={actionsLeft} actionsRight={actionsRight}>
        {props.actionContent}
      </SimpleCardActions>
    </Card>
  );
};

export default SimpleCard;
