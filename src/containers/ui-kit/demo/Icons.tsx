import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';

const Icons = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<i className="ui_down-arrow"></i>}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant={'h5'}>Icons</Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                gap: '20px',
                maxWidth: '700px',
                margin: '0 auto',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <i className="ui_deal"></i>
              <i className="ui_bag"></i>
              <i className="ui_location"></i>
              <i className="ui_truck"></i>
              <i className="ui_user"></i>
              <i className="ui_notes"></i>
              <i className="ui_bag-filled"></i>
              <i className="ui_heart-filled"></i>
              <i className="ui_search"></i>
              <i className="ui_tick"></i>
              <i className="ui_close"></i>
              <i className="ui_burger"></i>
              <i className="ui_messages"></i>
              <i className="ui_app"></i>
              <i className="ui_equals"></i>
              <i className="ui_listMenu"></i>
              <i className="ui_minus"></i>
              <i className="ui_plus"></i>
              <i className="ui_warning"></i>
              <i className="ui_earth"></i>
              <i className="ui_bells"></i>
              <i className="ui_shop"></i>
              <i className="ui_upward"></i>
              <i className="ui_statistics"></i>
              <i className="ui_list"></i>
              <i className="ui_microphone"></i>
              <i className="ui_soundcontroller"></i>
              <i className="ui_settings"></i>
              <i className="ui_calendar"></i>
              <i className="ui_pencil"></i>
              <i className="ui_trash"></i>
              <i className="ui_copy"></i>
              <i className="ui_eye"></i>
              <i className="ui_eye-off"></i>
              <i className="ui_download"></i>
              <i className="ui_users"></i>
              <i className="ui_info"></i>
              <i className="ui_line-chart-up"></i>
              <i className="ui_message-chat"></i>
              <i className="ui_cube"></i>
              <i className="ui_credit-card"></i>
              <i className="ui_filter-funnel"></i>
              <i className="ui_receipt"></i>
              <i className="ui_folder"></i>
              <i className="ui_toggle-right"></i>
              <i className="ui_Bold"></i>
              <i className="ui_italic"></i>
              <i className="ui_underline"></i>
              <i className="ui_eraser"></i>
              <i className="ui_numberMenu"></i>
              <i className="ui_link"></i>
              <i className="ui_code-snippet"></i>
              <i className="ui_dots-horizontal"></i>
              <i className="ui_dots-vertical"></i>
              <i className="ui_login"></i>
              <i className="ui_message-circle"></i>
              <i className="ui_star"></i>
              <i className="ui_star-filled"></i>
              <i className="ui_home-line"></i>
              <i className="ui_chevron-select"></i>
              <i className="ui_image-plus"></i>
              <i className="ui_refresh"></i>
              <i className="ui_link-external"></i>
              <i className="ui_data-flow"></i>
              <i className="ui_rocket"></i>
              <i className="ui_Flag"></i>
              <i className="ui_upload-cloud"></i>
              <i className="ui_phone"></i>
              <i className="ui_archive"></i>
              <i className="ui_flip-backward"></i>
              <i className="ui_double-pieces-burger"></i>
              <i className="ui_clock"></i>
              <i className="ui_paperclip"></i>
              <i className="ui_send"></i>
              <i className="ui_file-04"></i>
              <i className="ui_wallet"></i>
              <i className="ui_download-cloud"></i>
              <i className="ui_eye-filled"></i>
              <i className="ui_award-filled"></i>
              <i className="ui_app-filled"></i>
              <i className="ui_message-circle-filled"></i>
              <i className="ui_play-filled"></i>
              <i className="ui_equals-filled"></i>
              <i className="ui_location-filled"></i>
              <i className="ui_vk"></i>
              <i className="ui_facebook"></i>
              <i className="ui_twitter"></i>
              <i className="ui_instagram"></i>
              <i className="ui_telegram"></i>
              <i className="ui_linkedin"></i>
              <i className="ui_whatsapp"></i>
              <i className="ui_Logo"></i>
              <i className="ui_down-arrow"></i>
              <i className="ui_up-arrow"></i>
              <i className="ui_right-arrow"></i>
              <i className="ui_left-arrow"></i>
              <i className="ui_Icon-Stroke-4"></i>
            </Box>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Icons;
