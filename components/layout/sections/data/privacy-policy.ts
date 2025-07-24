export interface FAQProps {
    h1?: string;
    h2?: string;
    h3?: string;
    p?: string;
    ul?: string[];
    table?: { category: string; examples: string; collected: string }[];
  }
  
  export const faqList: FAQProps[] = [
    {
      h1: "Privacy Policy",
      p: "Last updated: July 01, 2025",
    },
    {
      p: "This Privacy Notice for tsar (\"we,\" \"us,\" or \"our\"), describes how and why we might access, collect, store, use, and/or share (\"process\") your personal information when you use our services (\"Services\"), including when you:",
      ul: [
        "Visit our website at www.tsarseo.online or any website of ours that links to this Privacy Notice",
        "Engage with us in other related ways, including any sales, marketing, or events",
      ],
    },
    {
      p: "<strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at hamednourzaie1@gmail.com.",
    },
    {
      h2: "Summary of Key Points",
      p: "This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.",
      ul: [
        "<strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.",
        "<strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.",
        "<strong>Do we collect any information from third parties?</strong> We may collect information from public databases, marketing partners, social media platforms, and other outside sources.",
        "<strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.",
        "<strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.",
        "<strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information.",
        "<strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.",
        "<strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us.",
      ],
    },
    {
      h2: "Table of Contents",
      ul: [
        "What Information Do We Collect?",
        "How Do We Process Your Information?",
        "What Legal Bases Do We Rely On to Process Your Personal Information?",
        "When and With Whom Do We Share Your Personal Information?",
        "What Is Our Stance on Third-Party Websites?",
        "Do We Use Cookies and Other Tracking Technologies?",
        "Do We Offer Artificial Intelligence-Based Products?",
        "How Do We Handle Your Social Logins?",
        "How Long Do We Keep Your Information?",
        "How Do We Keep Your Information Safe?",
        "Do We Collect Information from Minors?",
        "What Are Your Privacy Rights?",
        "Controls for Do-Not-Track Features",
        "Do United States Residents Have Specific Privacy Rights?",
        "Do Other Regions Have Specific Privacy Rights?",
        "Do We Make Updates to This Notice?",
        "How Can You Contact Us About This Notice?",
        "How Can You Review, Update, or Delete the Data We Collect from You?",
      ],
    },
    {
      h2: "1. What Information Do We Collect?",
      h3: "Personal Information You Disclose to Us",
      p: "<strong>In Short:</strong> We collect personal information that you provide to us.",
    },
    {
      p: "We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.",
    },
    {
      p: "<strong>Personal Information Provided by You.</strong> The personal information we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:",
      ul: [
        "Names",
        "Phone numbers",
        "Email addresses",
        "Contact preferences",
        "Contact or authentication data",
      ],
    },
    {
      p: "<strong>Sensitive Information.</strong> We do not process sensitive information.",
    },
    {
      p: "<strong>Social Media Login Data.</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called \"HOW DO WE HANDLE YOUR SOCIAL LOGINS?\" below.",
    },
    {
      p: "All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.",
    },
    {
      h3: "Information Automatically Collected",
      p: "<strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.",
    },
    {
      p: "We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.",
    },
    {
      p: "The information we collect includes:",
      ul: [
        "<strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called \"crash dumps\"), and hardware settings).",
        "<strong>Device Data.</strong> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.",
        "<strong>Location Data.</strong> We collect location data such as information about your device’s location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.",
      ],
    },
    {
      p: "<strong>Google API.</strong> Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.",
    },
    {
      h3: "Information Collected from Other Sources",
      p: "<strong>In Short:</strong> We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.",
    },
    {
      p: "In order to enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, and from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles, for purposes of targeted advertising and event promotion.",
    },
    {
      p: "If you interact with us on a social media platform using your social media account (e.g., Facebook or X), we receive personal information about you from such platforms such as your name, email address, and gender. You may have the right to withdraw your consent to processing your personal information. Any personal information that we collect from your social media account depends on your social media account’s privacy settings.",
    },
    {
      h2: "2. How Do We Process Your Information?",
      p: "<strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.",
    },
    {
      p: "We process your personal information for a variety of reasons, depending on how you interact with our Services, including:",
      ul: [
        "To save or protect an individual’s vital interest. We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.",
      ],
    },
    {
      h2: "3. What Legal Bases Do We Rely On to Process Your Information?",
      p: "<strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.",
    },
    {
      h3: "If you are located in the EU or UK, this section applies to you.",
      p: "The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:",
      ul: [
        "<strong>Consent.</strong> We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.",
        "<strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.",
        "<strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.",
      ],
    },
    {
      p: "In legal terms, we are generally the \"data controller\" under European data protection laws of the personal information described in this Privacy Notice, since we determine the means and/or purposes of the data processing we perform.",
    },
    {
      h3: "If you are located in Canada, this section applies to you.",
      p: "We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.",
    },
    {
      p: "In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:",
      ul: [
        "If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way",
        "For investigations and fraud detection and prevention",
        "For business transactions provided certain conditions are met",
        "If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim",
        "For identifying injured, ill, or deceased persons and communicating with next of kin",
        "If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse",
        "If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada ",
        "If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records",
        "If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced",
        "If the collection is solely for journalistic, artistic, or literary purposes",
        "If the information is publicly available and is specified by the regulations",
        "We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments",
      ],
    },
    {
      h2: "4. When and With Whom Do We Share Your Personal Information?",
      p: "<strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.",
    },
    {
      p: "We may need to share your personal information in the following situations:",
      ul: [
        "<strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.",
        "<strong>Affiliates.</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.",
        "<strong>Business Partners.</strong> We may share your information with our business partners to offer you certain products, services, or promotions.",
      ],
    },
    {
      h2: "5. What Is Our Stance on Third-Party Websites?",
      p: "<strong>In Short:</strong> We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.",
    },
    {
      p: "The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications.",
    },
    {
      h2: "6. Do We Use Cookies and Other Tracking Technologies?",
      p: "<strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.",
    },
    {
      p: "We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.",
    },
    {
      p: "We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences).",
    },
    {
      p: "<strong>Google Analytics.</strong> We may share your information with Google Analytics to track and analyze the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout.",
    },
    {
      h2: "7. Do We Offer Artificial Intelligence-Based Products?",
      p: "<strong>In Short:</strong> We offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies.",
    },
    {
      p: "As part of our Services, we offer products, features, or tools powered by artificial intelligence, machine learning, or similar technologies (collectively, \"AI Products\"). These tools are designed to enhance your experience and provide you with innovative solutions.",
    },
    {
      p: "<strong>Use of AI Technologies.</strong> We provide the AI Products through third-party service providers (\"AI Service Providers\"), including Google Cloud AI. Your input, output, and personal information will be shared with and processed by these AI Service Providers to enable your use of our AI Products.",
    },
    {
      p: "<strong>Our AI Products.</strong> Our AI Products are designed for the following functions: AI deployment.",
    },
    {
      p: "<strong>How We Process Your Data Using AI.</strong> All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreement with third parties.",
    },
    {
      h2: "8. How Do We Handle Your Social Logins?",
      p: "<strong>In Short:</strong> If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.",
    },
    {
      p: "Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider.",
    },
    {
      h2: "9. How Long Do We Keep Your Information?",
      p: "<strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.",
    },
    {
      p: "We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).",
    },
    {
      h2: "10. How Do We Keep Your Information Safe?",
      p: "<strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.",
    },
    {
      p: "We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process.",
    },
    {
      h2: "11. Do We Collect Information from Minors?",
      p: "<strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.",
    },
    {
      p: "We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. If we learn that personal information from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at hamednourzaie1@gmail.com.",
    },
    {
      h2: "12. What Are Your Privacy Rights?",
      p: "<strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information.",
    },
    {
      p: "In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making.",
    },
    {
      p: "If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or UK data protection authority.",
    },
    {
      p: "If you are located in Switzerland, you may contact the Federal Data Protection and Information Commissioner.",
    },
    {
      p: "<strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section \"HOW CAN YOU CONTACT US ABOUT THIS NOTICE?\" below.",
    },
    {
      h2: "13. Controls for Do-Not-Track Features",
      p: "Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (\"DNT\") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized.",
    },
    {
      p: "California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.",
    },
    {
      h2: "14. Do United States Residents Have Specific Privacy Rights?",
      p: "<strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.",
    },
    {
      p: "<strong>Categories of Personal Information We Collect</strong>",
    },
    {
      p: "The table below shows the categories of personal information we have collected in the past twelve (12) months.",
      table: [
        {
          category: "A. Identifiers",
          examples: "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name",
          collected: "NO",
        },
        {
          category: "B. Personal information as defined in the California Customer Records statute",
          examples: "Name, contact information, education, employment, employment history, and financial information",
          collected: "NO",
        },
        {
          category: "C. Protected classification characteristics under state or federal law",
          examples: "Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data",
          collected: "NO",
        },
        {
          category: "D. Commercial information",
          examples: "Transaction information, purchase history, financial details, and payment information",
          collected: "NO",
        },
        {
          category: "E. Biometric information",
          examples: "Fingerprints and voiceprints",
          collected: "NO",
        },
        {
          category: "F. Internet or other similar network activity",
          examples: "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements",
          collected: "NO",
        },
        {
          category: "G. Geolocation data",
          examples: "Device location",
          collected: "NO",
        },
        {
          category: "H. Audio, electronic, sensory, or similar information",
          examples: "Images and audio, video or call recordings created in connection with our business activities",
          collected: "YES",
        },
        {
          category: "I. Professional or employment-related information",
          examples: "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us",
          collected: "NO",
        },
        {
          category: "J. Education Information",
          examples: "Student records and directory information",
          collected: "NO",
        },
        {
          category: "K. Inferences drawn from collected personal information",
          examples: "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics",
          collected: "YES",
        },
        {
          category: "L. Sensitive personal Information",
          examples: "",
          collected: "NO",
        },
      ],
    },
    {
      p: "We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:",
      ul: [
        "Receiving help through our customer support channels;",
        "Participation in customer surveys or contests; and",
        "Facilitation in the delivery of our Services and to respond to your inquiries.",
      ],
    },
    {
      p: "We will use and retain the collected personal information as needed to provide the Services or for:",
      ul: [
        "Category H - 6 months",
      ],
    },
    {
      p: "<strong>Your Rights</strong>",
    },
    {
      p: "You have rights under certain US state data protection laws. These rights include:",
      ul: [
        "Right to know whether or not we are processing your personal data",
        "Right to access your personal data",
        "Right to correct inaccuracies in your personal data",
        "Right to request the deletion of your personal data",
        "Right to obtain a copy of the personal data you previously shared with us",
        "Right to non-discrimination for exercising your rights",
        "Right to opt out of the processing of your personal data if it is used for targeted advertising, the sale of personal data, or profiling",
      ],
    },
    {
      p: "Depending upon the state where you live, you may also have the following rights:",
      ul: [
        "Right to access the categories of personal data being processed",
        "Right to obtain a list of the categories of third parties to which we have disclosed personal data",
        "Right to obtain a list of specific third parties to which we have disclosed personal data",
        "Right to review, understand, question, and correct how personal data has been profiled",
        "Right to limit use and disclosure of sensitive personal data",
        "Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature",
      ],
    },
    {
      p: "<strong>How to Exercise Your Rights</strong>",
    },
    {
      p: "To exercise these rights, you can contact us by submitting a data subject access request, or by referring to the contact details at the bottom of this document.",
    },
    {
      p: "<strong>California \"Shine The Light\" Law</strong>",
    },
    {
      p: "California Civil Code Section 1798.83, also known as the \"Shine The Light\" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year.",
    },
    {
      h2: "15. Do Other Regions Have Specific Privacy Rights?",
      p: "<strong>In Short:</strong> You may have additional rights based on the country you reside in.",
    },
    {
      h3: "Australia and New Zealand",
      p: "We collect and process your personal information under the obligations and conditions set by Australia's Privacy Act 1988 and New Zealand's Privacy Act 2020 (Privacy Act).",
    },
    {
      p: "If you do not wish to provide the personal information necessary to fulfill their applicable purpose, it may affect our ability to provide our services, in particular:",
      ul: [
        "Offer you the products or services that you want",
        "Respond to or help with your requests",
      ],
    },
    {
      h3: "Republic of South Africa",
      p: "If you are unsatisfied with the manner in which we address any complaint with regard to our processing of personal information, you can contact the office of the regulator, the details of which are:",
    },
    {
      p: "The Information Regulator (South Africa)<br />General enquiries: enquiries@inforegulator.org.za<br />Complaints: PAIAComplaints@inforegulator.org.za & POPIAComplaints@inforegulator.org.za",
    },
    {
      h2: "16. Do We Make Updates to This Notice?",
      p: "<strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.",
    },
    {
      p: "We may update this Privacy Notice from time to time. The updated version will be indicated by an updated \"Revised\" date at the top of this Privacy Notice.",
    },
    {
      h2: "17. How Can You Contact Us About This Notice?",
      p: "If you have questions or comments about this notice, you may contact us by post at:",
    },
    {
      p: "tsar<br />Okstigen 2<br />Stockheim, 123 05031<br />Iran",
    },
    {
      p: "If you are a resident in the European Economic Area, we are the \"data controller\" of your personal information. We have appointed __________ to be our representative in the EEA. You can contact them directly regarding our processing of your information, or by post to:",
    },
    {
      p: "tsarseo.online<br />Okstigen 2<br />Stockheim, regrg2<br />Stockheim, تهران 138821<br />Sweden",
    },
    {
      p: "If you are a resident in the United Kingdom, we are the \"data controller\" of your personal information. We have appointed __________ to be our representative in the UK. You can contact them directly regarding our processing of your information, or by post to:",
    },
    {
      p: "__________<br />__________ __________<br />United Kingdom",
    },
    {
      p: "<strong>Swiss Representative</strong><br />__________<br />Okstigen 2<br />Stockheim, regrg2<br />138821 Stockheim<br />Switzerland",
    },
    {
      h2: "18. How Can You Review, Update, or Delete the Data We Collect from You?",
      p: "You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.",
    },
  ];