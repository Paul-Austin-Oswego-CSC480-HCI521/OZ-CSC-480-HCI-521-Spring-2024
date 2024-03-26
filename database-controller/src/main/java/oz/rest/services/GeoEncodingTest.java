package oz.rest.services;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class GeoEncodingTest {

    public static void main(String[] args) {
        try {
            Scanner addScanner = new Scanner(System.in);
            System.out.println("Please Enter your address:");
            String address = addScanner.nextLine();
            String accessToken = "***REMOVED***";


            String url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
                    + address.replace(" ", "%20")
                    + ".json?access_token=" + accessToken;

            String response = makeHTTPRequest(url);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String makeHTTPRequest(String urlString) throws IOException {
        int count = 0;
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        line = reader.readLine();
        int ind = line.indexOf("coordinates\":[");
        String coordString = line.substring(ind + 14, ind + 35);
        coordString = coordString.substring(0, coordString.indexOf(']'));
        float[] coords = new float[2];
        coords[1] = Float.parseFloat(coordString.substring(0, coordString.indexOf(',')));
        coords[0] = Float.parseFloat(coordString.substring(coordString.indexOf(',') + 1));
        System.out.println(coords[0] + " " + coords[1]);
        return response.toString();
    }
}
