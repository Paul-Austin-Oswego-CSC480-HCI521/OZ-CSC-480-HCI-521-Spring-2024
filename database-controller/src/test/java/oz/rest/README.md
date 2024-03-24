# IMPORTANT TESTING INFORMATION
Integration test file names MUST end with: IT.java
Unit test file names MUST end with: Test.java

Directory structure doesn't particularly matter, feel free to reorganize as long as tests are under the src/test directory

NOTE: All tests are run upon running mvn verify, OR docker compose up (as such, all tests must pass in order to run the application); consider using mvn test to ONLY run unit tests that don't rely on a running MongoDB server