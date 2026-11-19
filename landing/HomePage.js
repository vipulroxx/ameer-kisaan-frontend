import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AppBar, Toolbar, Box, Container, Typography, Button, Card, CardContent, Chip, Stack, Link,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  FaCloudSun, FaSeedling, FaRobot, FaCamera, FaLandmark, FaUsers,
  FaUserPlus, FaClipboardList, FaTractor, FaCheckCircle,
} from 'react-icons/fa';
import heroImage from './images/hero-wheat.jpg';
import harvestImage from './images/harvest-rice.jpg';

// All homepage copy, in English and Hindi. Only claims the app can back up:
// every feature listed here exists in the app.
const COPY = {
  en: {
    langToggle: 'हिंदी',
    langToggleLabel: 'हिंदी में देखें',
    login: 'Log in',
    getStarted: 'Get started',
    openApp: 'Open dashboard',
    kicker: 'Made for the farmers of Jharkhand',
    slogan: 'Smart Kheti, Ameer Kisaan',
    heroLine: 'You can be a farmer too, and a prosperous one.',
    heroSub: 'Plan smarter, harvest faster and grow your income with weather, crop advice and an AI assistant in one free app.',
    getStartedFree: 'Get started free',
    videosTitle: 'See Ameer Kisaan in action',
    videosSub: 'Two short videos: what the app does, and how to use it step by step.',
    videos: [
      { file: '1-what-is-ameer-kisaan', title: 'What is Ameer Kisaan?', text: 'A tour of every feature, from live weather to Kisaan AI.', length: '3 min' },
      { file: '2-how-to-use-ameer-kisaan', title: 'How to use Ameer Kisaan', text: 'Step by step: sign up, plan your season, report problems and more.', length: '3 min' },
    ],
    videoNote: 'Videos are narrated in English.',
    featuresTitle: 'Everything you need for a better season',
    features: [
      { icon: FaCloudSun, title: 'Live weather', text: 'Know when to sow, spray and harvest with local forecasts, rain chances and soil data.' },
      { icon: FaSeedling, title: 'Crop recommendations', text: 'Find the crops that suit your soil and your land.' },
      { icon: FaRobot, title: 'Kisaan AI', text: 'Ask farming questions in Hindi or English and get answers from trusted crop guides.' },
      { icon: FaCamera, title: 'Crop identification', text: 'Take a photo and the app tells you which crop it is.' },
      { icon: FaLandmark, title: 'Government schemes', text: 'See the schemes and subsidies you can apply for.' },
      { icon: FaUsers, title: 'Inventory and community', text: 'Track your produce and learn from other farmers in the forum.' },
    ],
    stepsTitle: 'How it works',
    steps: [
      { icon: FaUserPlus, title: 'Register for free', text: 'Create your account in a minute.' },
      { icon: FaClipboardList, title: 'Plan your season', text: 'Use weather, recommendations and Kisaan AI to decide what to grow and when.' },
      { icon: FaTractor, title: 'Harvest and grow', text: 'Harvest on time, cut losses from pests and bad weather, and earn more from every acre.' },
    ],
    harvestTitle: 'Faster, more efficient harvests',
    harvestText: 'Agriculture grows when every step is planned. Ameer Kisaan helps you get each one right.',
    harvestPoints: [
      'Sow at the right time with weather updates',
      'Report crop problems with photos and act early',
      'Choose the right crop for your soil',
      'Use the government support you are entitled to',
    ],
    ctaTitle: 'Start your journey to becoming an Ameer Kisaan',
    ctaText: 'Join today. It is free.',
    haveAccount: 'Already have an account?',
    rights: 'All Rights Reserved.',
  },
  hi: {
    langToggle: 'English',
    langToggleLabel: 'View in English',
    login: 'लॉग इन',
    getStarted: 'शुरू करें',
    openApp: 'डैशबोर्ड खोलें',
    kicker: 'झारखंड के किसानों के लिए',
    slogan: 'स्मार्ट खेती, अमीर किसान',
    heroLine: 'आप भी किसान बन सकते हैं, और एक समृद्ध किसान।',
    heroSub: 'मौसम, फसल सलाह और AI सहायक, सब एक मुफ़्त ऐप में। बेहतर योजना बनाएं, तेज़ी से फसल काटें और अपनी आमदनी बढ़ाएं।',
    getStartedFree: 'मुफ़्त में शुरू करें',
    videosTitle: 'अमीर किसान को काम करते देखें',
    videosSub: 'दो छोटे वीडियो: ऐप क्या करता है, और इसे कदम-दर-कदम कैसे इस्तेमाल करें।',
    videos: [
      { file: '1-what-is-ameer-kisaan', title: 'अमीर किसान क्या है?', text: 'लाइव मौसम से लेकर किसान AI तक, हर सुविधा की झलक।', length: '3 मिनट' },
      { file: '2-how-to-use-ameer-kisaan', title: 'अमीर किसान का इस्तेमाल कैसे करें', text: 'कदम-दर-कदम: खाता बनाएं, मौसम की योजना बनाएं, समस्या बताएं और भी बहुत कुछ।', length: '3 मिनट' },
    ],
    videoNote: 'वीडियो में आवाज़ अंग्रेज़ी में है।',
    featuresTitle: 'बेहतर फसल के लिए सब कुछ एक जगह',
    features: [
      { icon: FaCloudSun, title: 'मौसम की जानकारी', text: 'स्थानीय मौसम, बारिश की संभावना और मिट्टी की जानकारी से जानें कब बोना, छिड़काव करना और कटाई करनी है।' },
      { icon: FaSeedling, title: 'फसल सुझाव', text: 'अपनी मिट्टी और ज़मीन के अनुसार सही फसल चुनें।' },
      { icon: FaRobot, title: 'किसान AI', text: 'हिंदी या अंग्रेज़ी में खेती से जुड़े सवाल पूछें और भरोसेमंद फसल गाइड से जवाब पाएं।' },
      { icon: FaCamera, title: 'फसल पहचान', text: 'फ़ोटो लें और ऐप बताएगा कि यह कौन-सी फसल है।' },
      { icon: FaLandmark, title: 'सरकारी योजनाएं', text: 'उन योजनाओं और सब्सिडी को देखें जिनके लिए आप आवेदन कर सकते हैं।' },
      { icon: FaUsers, title: 'भंडार और समुदाय', text: 'अपनी उपज का हिसाब रखें और फ़ोरम में दूसरे किसानों से सीखें।' },
    ],
    stepsTitle: 'यह कैसे काम करता है',
    steps: [
      { icon: FaUserPlus, title: 'मुफ़्त में रजिस्टर करें', text: 'एक मिनट में अपना खाता बनाएं।' },
      { icon: FaClipboardList, title: 'अपने सीज़न की योजना बनाएं', text: 'मौसम, सुझाव और किसान AI से तय करें कि क्या और कब उगाना है।' },
      { icon: FaTractor, title: 'कटाई करें और आगे बढ़ें', text: 'समय पर कटाई करें, कीट और खराब मौसम से होने वाला नुकसान घटाएं और हर एकड़ से ज़्यादा कमाएं।' },
    ],
    harvestTitle: 'तेज़ और कुशल कटाई',
    harvestText: 'जब हर कदम सोच-समझकर उठाया जाता है, तब खेती आगे बढ़ती है। अमीर किसान हर कदम पर आपकी मदद करता है।',
    harvestPoints: [
      'मौसम की जानकारी से सही समय पर बुवाई',
      'फ़ोटो के साथ फसल की समस्या बताएं और जल्दी कदम उठाएं',
      'अपनी मिट्टी के लिए सही फसल चुनें',
      'जिस सरकारी सहायता के आप हक़दार हैं, उसका लाभ उठाएं',
    ],
    ctaTitle: 'अमीर किसान बनने का सफ़र आज ही शुरू करें',
    ctaText: 'आज ही जुड़ें। यह मुफ़्त है।',
    haveAccount: 'पहले से खाता है?',
    rights: 'सर्वाधिकार सुरक्षित।',
  },
};

function Reveal({ children, delay = 0, style }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      style={style}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

const sectionTitle = { textAlign: 'center', color: 'primary.main', mb: { xs: 3, md: 5 }, fontSize: { xs: '1.6rem', md: '2.2rem' } };

const HomePage = ({ isAuthenticated }) => {
  const [lang, setLang] = useState('en');
  const t = COPY[lang];

  // Logged-in users see "Open dashboard" instead of the sign-up/log-in pair.
  const primaryCta = isAuthenticated
    ? { to: '/app', label: t.openApp }
    : { to: '/register', label: t.getStartedFree };

  return (
    <Box lang={lang} sx={{ bgcolor: 'background.default', overflowX: 'hidden' }}>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" component="span" sx={{ color: 'secondary.main', fontWeight: 800, letterSpacing: '0.06em', flexGrow: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            AMEER KISAAN
          </Typography>
          <Button color="inherit" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} aria-label={t.langToggleLabel} sx={{ px: 1.5, color: 'secondary.light' }}>
            {t.langToggle}
          </Button>
          {isAuthenticated ? (
            <Button component={RouterLink} to="/app" variant="contained" color="secondary">{t.openApp}</Button>
          ) : (
            <>
              <Button component={RouterLink} to="/login" variant="outlined" color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' }, borderColor: alpha('#fff', 0.6) }}>
                {t.login}
              </Button>
              <Button component={RouterLink} to="/register" variant="contained" color="secondary">{t.getStarted}</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero */}
      <Box
        component="section"
        sx={{
          position: 'relative',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          minHeight: { md: 'min(78vh, 680px)' },
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'rgba(16, 40, 22, 0.78)',
              md: 'linear-gradient(90deg, rgba(16,40,22,0.88) 0%, rgba(16,40,22,0.65) 55%, rgba(16,40,22,0.25) 100%)',
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', py: { xs: 6, md: 8 } }}>
          <Reveal style={{ maxWidth: 640 }}>
            <Chip
              label={t.kicker}
              sx={{ bgcolor: alpha('#e3a51f', 0.18), color: '#ffd877', border: '1px solid', borderColor: alpha('#ffd877', 0.5), fontWeight: 600 }}
            />
            <Typography variant="h1" sx={{ mt: 2, color: 'secondary.main', fontSize: { xs: '2.3rem', sm: '3.2rem', md: '4.2rem' }, lineHeight: 1.1, textWrap: 'balance' }}>
              {t.slogan}
            </Typography>
            <Typography variant="h5" component="p" sx={{ mt: 2, color: '#fff', fontWeight: 600, fontSize: { xs: '1.25rem', md: '1.75rem' }, textWrap: 'balance' }}>
              {t.heroLine}
            </Typography>
            <Typography sx={{ mt: 1.5, color: alpha('#fff', 0.88), fontSize: '1.05rem', maxWidth: 560 }}>
              {t.heroSub}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 3.5 }}>
              <Button component={RouterLink} to={primaryCta.to} variant="contained" color="secondary" size="large">
                {primaryCta.label}
              </Button>
              {!isAuthenticated && (
                <Button component={RouterLink} to="/login" variant="contained" size="large"
                  sx={{ bgcolor: alpha('#fff', 0.92), color: 'primary.main', '&:hover': { bgcolor: '#fff' } }}>
                  {t.login}
                </Button>
              )}
            </Stack>
          </Reveal>
        </Container>
      </Box>

      {/* Videos */}
      <Box component="section" aria-labelledby="videos-title" sx={{ bgcolor: '#f1ead6', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography id="videos-title" variant="h2" sx={{ ...sectionTitle, mb: 1.5 }}>{t.videosTitle}</Typography>
          <Typography color="text.secondary" sx={{ textAlign: 'center', mb: { xs: 3, md: 4 }, fontSize: '1.05rem' }}>{t.videosSub}</Typography>
          <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
            {t.videos.map(({ file, title, text, length }, i) => (
              <Reveal key={file} delay={i * 0.08} style={{ height: '100%' }}>
                <Card sx={{ height: '100%', overflow: 'hidden' }}>
                  <Box
                    component="video"
                    controls
                    playsInline
                    preload="none"
                    poster={`${process.env.PUBLIC_URL}/videos/${file}.jpg`}
                    aria-label={title}
                    sx={{ width: '100%', aspectRatio: '16 / 9', display: 'block', bgcolor: 'primary.dark' }}
                  >
                    <source src={`${process.env.PUBLIC_URL}/videos/${file}.mp4`} type="video/mp4" />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="h6" component="h3" sx={{ color: 'primary.main', flexGrow: 1 }}>{title}</Typography>
                      <Chip size="small" label={length} sx={{ bgcolor: '#e6f0e3', color: 'primary.main', fontWeight: 600 }} />
                    </Stack>
                    <Typography color="text.secondary" sx={{ mt: 0.75 }}>{text}</Typography>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </Box>
          {lang === 'hi' && (
            <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2, fontSize: '0.9rem' }}>{t.videoNote}</Typography>
          )}
        </Container>
      </Box>

      {/* Features */}
      <Container component="section" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography variant="h2" sx={sectionTitle}>{t.featuresTitle}</Typography>
        <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' } }}>
          {t.features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.05} style={{ height: '100%' }}>
              <Card sx={{ height: '100%', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 24px rgba(31,77,43,0.12)' } }}>
                <CardContent sx={{ p: 3 }}>
                  <Box aria-hidden sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: '#e6f0e3', color: 'primary.light', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                    <Icon />
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ mt: 1.75, color: 'primary.main' }}>{title}</Typography>
                  <Typography color="text.secondary" sx={{ mt: 0.75 }}>{text}</Typography>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </Box>
      </Container>

      {/* How it works */}
      <Box component="section" sx={{ bgcolor: '#f1ead6', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={sectionTitle}>{t.stepsTitle}</Typography>
          <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
            {t.steps.map(({ icon: Icon, title, text }, i) => (
              <Box component="li" key={title}>
                <Reveal delay={i * 0.08} style={{ height: '100%' }}>
                  <Card sx={{ height: '100%', position: 'relative', textAlign: 'center' }}>
                    <CardContent sx={{ p: 3.5 }}>
                      <Typography sx={{ position: 'absolute', top: 14, left: 16, fontWeight: 800, color: 'secondary.dark' }}>{i + 1}</Typography>
                      <Box aria-hidden sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'primary.main', color: 'secondary.main', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.7rem' }}>
                        <Icon />
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ mt: 1.75, color: 'primary.main' }}>{title}</Typography>
                      <Typography color="text.secondary" sx={{ mt: 0.75 }}>{text}</Typography>
                    </CardContent>
                  </Card>
                </Reveal>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Harvest */}
      <Container component="section" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'grid', gap: { xs: 3, md: 5 }, alignItems: 'center', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <Reveal>
            <Box component="img" src={harvestImage} alt="" loading="lazy"
              sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
          </Reveal>
          <Reveal delay={0.1}>
            <Typography variant="h2" sx={{ ...sectionTitle, textAlign: 'left', mb: 2 }}>{t.harvestTitle}</Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>{t.harvestText}</Typography>
            <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', p: 0, mt: 2.5, mb: 0 }}>
              {t.harvestPoints.map((p) => (
                <Box component="li" key={p} sx={{ display: 'flex', gap: 1.25, alignItems: 'flex-start', fontWeight: 500 }}>
                  <Box component="span" aria-hidden sx={{ color: 'primary.light', mt: '3px', flexShrink: 0 }}><FaCheckCircle /></Box>
                  {p}
                </Box>
              ))}
            </Stack>
          </Reveal>
        </Box>
      </Container>

      {/* Closing call to action */}
      <Box component="section" sx={{ bgcolor: 'primary.main', color: '#fff', textAlign: 'center', py: { xs: 6, md: 8 }, px: 2 }}>
        <Reveal>
          <Typography variant="h2" sx={{ color: 'secondary.main', fontSize: { xs: '1.6rem', md: '2.4rem' }, maxWidth: 760, mx: 'auto', textWrap: 'balance' }}>
            {t.ctaTitle}
          </Typography>
          <Typography sx={{ mt: 1.5, color: alpha('#fff', 0.88), fontSize: '1.1rem' }}>{t.ctaText}</Typography>
          <Button component={RouterLink} to={primaryCta.to} variant="contained" color="secondary" size="large" sx={{ mt: 3 }}>
            {primaryCta.label}
          </Button>
          {!isAuthenticated && (
            <Typography sx={{ mt: 2, color: alpha('#fff', 0.8) }}>
              {t.haveAccount}{' '}
              <Link component={RouterLink} to="/login" sx={{ color: '#ffe08a', fontWeight: 600 }}>{t.login}</Link>
            </Typography>
          )}
        </Reveal>
      </Box>

      <Box component="footer" sx={{ bgcolor: 'primary.dark', color: alpha('#fff', 0.75), textAlign: 'center', py: 2.25, px: 2, fontSize: '0.9rem' }}>
        Ameer Kisaan © {new Date().getFullYear()}. {t.rights}
      </Box>
    </Box>
  );
};

export default HomePage;
