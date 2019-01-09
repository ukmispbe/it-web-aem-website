;(function(h, $){

    var c = window.CQ.WatersIT.commons;
    var text = window.CQ.WatersIT.Text;
    var testValue = '<b>This</b> is a <i>rich</i> <u>text</u>.';
    var testTitle = 'Evaluation of the DART QDa System for Forensic Drug Screening ';
    var selectors = {
     editor: {
                title: '.text.aem-GridColumn h3',
                richtext: '.text.aem-GridColumn p'
            },
            rendered: {
                title: '.cmp-text > h3',
                richtext: '.cmp-text > p'
            }
    }

    text.tcExecuteBeforeTest = function () {
        return new TestCase("Setup Before Test")
            // common set up
            .execTestCase(c.tcExecuteBeforeTest)
            // create the test page, store page path in 'testPagePath'
            .execFct(function (opts,done) {
                c.createPage(c.template, c.rootPage, 'page_' + Date.now(), "testPagePath", done)
            })
            // add the component, store component path in 'cmpPath'
            .execFct(function (opts, done){
                c.addComponent(c.rtText, h.param("testPagePath")(opts) + c.relParentCompPath, "cmpPath", done)
            })
            // open the new page in the editor
            .navigateTo("/editor.html%testPagePath%.html");
    };

    text.tcExecuteAfterTest = function() {
        return new TestCase("Clean up after Test")
        // common clean up
        .execTestCase(c.tcExecuteAfterTest)
        // delete the test page we created
        .execFct(function (opts, done) {
            c.deletePage(h.param("testPagePath")(opts), done);
        });
    };

    text.tcSetTextValueUsingInlineEditor = function(tcExecuteBeforeTest, tcExecuteAfterTest) {
        return new h.TestCase('Set text using inline editor',{
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest})

            // open the inline editor
            .execTestCase(c.tcOpenInlineEditor("cmpPath"))

            //switch to the content frame
            .config.changeContext(c.getContentFrame)

            // set the example text
            .execFct(function() {
                h.find(selectors.editor.richtext).html(testValue);
            })

            // switch back to edit frame
            .config.resetContext()

            // click on save on the inline editor toolbar
            .execTestCase(c.tcSaveInlineEditor)

            //switch to the content frame
            .config.changeContext(c.getContentFrame)

            // check if the text is rendered
            .assert.isTrue(
                function() {
                    var actualValue = h.find(selectors.rendered.richtext).html();
                    return actualValue === testValue;
                })

            // switch back to edit frame
            .config.resetContext()

            // reload the page, to see if the text really got saved
            .navigateTo("/editor.html%testPagePath%.html")

            //switch to the content frame
            .config.changeContext(c.getContentFrame)

            // check again if the text is still there
            .assert.isTrue(
                function() {
                    var actualValue = h.find(selectors.rendered.richtext).html();
                    return actualValue === testValue;
                });
    };

    text.tcSetTextTitleAndValueUsingConfigDialog = function(tcExecuteBeforeTest, tcExecuteAfterTest) {
        return new h.TestCase('Set title and text using config dialog',{
            execBefore: tcExecuteBeforeTest,
            execAfter: tcExecuteAfterTest})

            .execTestCase(c.tcOpenConfigureDialog("cmpPath"))

            .fillInput("[name='./title']",testTitle)
            .fillInput("[name='./text']",testValue)

            .execTestCase(c.tcSaveConfigureDialog)

            .config.changeContext(c.getContentFrame)

            .assert.isTrue(function() {
                  var actualValue = h.find(selectors.rendered.title).html();
                  return actualValue === testTitle;
             });
    };

    var tcExecuteBeforeTest = text.tcExecuteBeforeTest();
    var tcExecuteAfterTest = text.tcExecuteAfterTest();

    new h.TestSuite('Waters Tests - Text', {path: '/apps/waters/tests/components/Text/Text.js',
        execBefore:c.tcExecuteBeforeTestSuite,
        execInNewWindow : false})
        .addTestCase(text.tcSetTextValueUsingInlineEditor(tcExecuteBeforeTest, tcExecuteAfterTest))
        .addTestCase(text.tcSetTextTitleAndValueUsingConfigDialog(tcExecuteBeforeTest, tcExecuteAfterTest))

}(hobs, jQuery));