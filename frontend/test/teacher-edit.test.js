import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`
test('Testing edit teachers', async t => {

    await t.navigateTo("/addTeacher");
    await t.typeText("#teacher-id", "999999");
    await t.typeText("#teacher-name", "Pasindu Basnayaka");
    await t.typeText("#teacher-age", "45");
    await t.typeText("#teacher-dob", "1997-11-30");
    await t.click("#teacher-add");

    await t.navigateTo("/teacher");
    await t.click("#teacher-edit-999999");

    await t.typeText("#teacher-name", "Changed Teacher Name");
    await t.typeText("#teacher-age", "99");
    await t.typeText("#teacher-DOB", "2023-12-30");
    await t.click("#teacher-edit");

    await t.navigateTo("/teacher");

    const table = Selector('#teacher-table')
    const rowCount = await table.find('tr').count;

    let tdText = await table.find('tr').nth(rowCount - 1).innerText;
    console.log("******* Added Teacher *******: " + tdText)
    await t.expect(tdText).contains("Changed Teacher Name");

    await t.navigateTo("/teacher");
    await t.click("#teacher-delete-999999");
});