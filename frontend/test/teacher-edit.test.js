import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`
test('Testing edit teachers', async t => {

    await t.navigateTo("/addTeacher");
    await t.typeText("#teacher-id", "88888888");
    await t.typeText("#teacher-name", "Pasindu Basnayaka");
    await t.typeText("#teacher-age", "45");
    await t.click("#teacher-add");

    await t.navigateTo("/teacher");
    await t.click("#teacher-edit-88888888");

    await t.typeText("#teacher-name", "Changed Teacher Name");
    await t.typeText("#teacher-age", "99");
    await t.click("#teacher-edit");

    await t.navigateTo("/teacher");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    let tdText2 = await table.find('tr').nth(rowCount - 2).innerText;
    console.log("******* Added Teacher *******: " + tdText)
    onsole.log("******* Added Teacher *******: " + tdText2)
    await t.expect(tdText).contains("Changed Teacher Name");

    await t.navigateTo("/teacher");
    await t.click("#teacher-delete-88888888");
});